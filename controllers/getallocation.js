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
//Check if the algorithm has published the final groupings
//Check if submitted students == total students, then return
//the final groupings by group_id
//result is an array of array whose inherent index is group_id - 1
function getallocation(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Retrieve the class name from the request parameters
            const { className } = req.params;
            // Fetch the class data using the className parameter
            const classData = yield Class_1.ClassModel.findOne({ className });
            if (!classData) {
                res.status(404).send("Class not found");
                return;
            }
            // Check if all students have submitted their data
            if (classData.currentSubmittedCount === classData.totalStudentCount) {
                // Fetch the students and their group allocations
                const students = yield Student_1.StudentModel.find({}, "allocatedGroupId").lean();
                const groupings = students.reduce((acc, student) => {
                    const groupId = student.allocatedGroupId ? student.allocatedGroupId - 1 : -1;
                    if (groupId >= 0) {
                        if (!acc[groupId]) {
                            acc[groupId] = [];
                        }
                        acc[groupId].push(student);
                    }
                    return acc;
                }, []);
                // Send the groupings
                res.status(200).json(groupings);
            }
            else {
                // If not all students have submitted their data
                res.status(200).send("Groupings not ready yet");
            }
        }
        catch (error) {
            console.error("Error handling getallocation", error);
            res.status(500).send("An error occurred");
        }
    });
}
exports.default = getallocation;
