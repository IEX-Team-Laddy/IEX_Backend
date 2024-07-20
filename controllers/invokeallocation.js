"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = invokeallocation;
const Class_1 = require("../models/Class");
const main_1 = require("../utils/genetic_algorithm/main");
//Check if the algorithm has published the final groupings
//Check if submitted students == total students, then return
//the final groupings by group_id
//result is an array of array whose inherent index is group_id - 1
function invokeallocation(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Retrieve the class name from the request parameters
            const className = req.params.className;
            const groupCount = Number(req.params.groupCount);
            // Fetch the class data using the className parameter
            const classData = yield Class_1.ClassModel.findOne({ className }).populate("studentList");
            if (!classData) {
                res.status(404).send("Class not found");
                return;
            }
            else {
                const studentList = classData.studentList
                    ? classData.studentList
                    : [];
                const idArray = (studentList === null || studentList === void 0 ? void 0 : studentList.map((student) => student.studentId)) || [];
                const homoDataArray = (studentList === null || studentList === void 0 ? void 0 : studentList.map((student) => student.homoData || [])) || [];
                const heteroDataArray = (studentList === null || studentList === void 0 ? void 0 : studentList.map((student) => student.heteroData || [])) || [];
                const feedbackDataArray = (studentList === null || studentList === void 0 ? void 0 : studentList.map((student) => student.feedbackData || [])) || [];
                const facultyDataArray = (studentList === null || studentList === void 0 ? void 0 : studentList.map((student) => student.faculty || "")) || [];
                if (classData.currentSubmittedCount === classData.totalStudentCount) {
                    const groupings = main_1.Main.main(idArray, homoDataArray, heteroDataArray, feedbackDataArray, facultyDataArray, true, classData.totalStudentCount, groupCount);
                    // Save the groupings
                    classData.groupings = groupings;
                    yield classData.save();
                    res.status(200).json("Successfully ran the algo and saved the data");
                }
                else {
                    // If not all students have submitted their data
                    res.status(400).send("Groupings not ready yet");
                }
            }
        }
        catch (error) {
            console.error("Error handling getallocation", error);
            res.status(500).send("An error occurred");
        }
    });
}
