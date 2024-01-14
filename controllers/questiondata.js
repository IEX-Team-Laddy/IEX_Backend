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
const Class_1 = require("../models/Class");
const Student_1 = require("../models/Student");
//import { runAlgorithm } from "../utils/genetic_algorithm/main";
//One user will be sending in one set of data at a time
//Once the submitted responses are received, immediately start
//running the algorithm, meanwhile send back an "OK" response to
//the last user who submitted the data
function handleQuestionData(req, res) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const arr = req.body;
            // Retrieve the data from the request body
            const className = arr[0];
            const studentId = arr[1];
            // const consent: String = arr[2]; // Ignored on purpose
            // const major: String = arr[3]; // TBC
            const homoData = arr[4];
            const heteroData = arr[5];
            // Check if the student exists
            let student = yield Student_1.StudentModel.findOne({ studentId });
            if (!student) {
                // Create a new student
                student = new Student_1.StudentModel({
                    studentId: studentId,
                    homoData: homoData,
                    heteroData: heteroData,
                });
            }
            else {
                student.homoData = homoData;
                student.heteroData = heteroData;
            }
            yield student.save();
            // Check if the class exists
            let classData = yield Class_1.ClassModel.findOne({ className: className });
            if (!classData) {
                // Create a new class
                classData = new Class_1.ClassModel({
                    className: className,
                    totalStudentCount: 20, // Hardcoded value
                    numberOfGroups: 5, // Hardcoded value
                    studentList: [student._id],
                    currentSubmittedCount: 1,
                });
            }
            else {
                // Update the class's studentList and currentSubmittedCount
                if (!((_a = classData.studentList) === null || _a === void 0 ? void 0 : _a.includes(student._id))) {
                    classData.studentList = (_b = classData.studentList) !== null && _b !== void 0 ? _b : [];
                    classData.studentList.push(student._id);
                    classData.currentSubmittedCount = (_c = classData.currentSubmittedCount) !== null && _c !== void 0 ? _c : 0;
                    classData.currentSubmittedCount += 1;
                }
            }
            yield classData.save();
            res.status(200).send("OK");
        }
        catch (error) {
            console.error("Error handling question data:", error);
            res.status(500).send("An error occurred");
        }
    });
}
exports.default = handleQuestionData;
