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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handleQuestionData;
const Class_1 = require("../models/Class");
const Student_1 = require("../models/Student");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
//One user will be sending in one set of data at a time
//Once the submitted responses are received
//Send back an "OK" response
function handleQuestionData(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e;
        try {
            const arr = req.body;
            console.log(arr);
            // Retrieve the data from the request body
            const className = arr[0];
            const studentId = arr[1];
            // const consent: String = arr[2]; // Ignored on purpose
            const faculty = arr[3];
            const homoData = arr[4];
            const heteroData = arr[5];
            const feedbackData = arr[6];
            // Check if the student exists
            let student = yield Student_1.StudentModel.findOne({ studentId });
            if (!student) {
                // Create a new student
                student = new Student_1.StudentModel({
                    studentId: studentId,
                    homoData: homoData,
                    heteroData: heteroData,
                    feedbackData: feedbackData,
                    faculty: faculty,
                });
            }
            else {
                student.homoData = homoData;
                student.heteroData = heteroData;
                student.feedbackData = feedbackData;
                student.faculty = faculty;
            }
            yield student.save();
            // Check if the class exists
            let classData = yield Class_1.ClassModel.findOne({ className: className });
            if (!classData) {
                // Create a new class
                classData = new Class_1.ClassModel({
                    className: className,
                    totalStudentCount: parseInt((_a = process.env.TOTALSTUDENTCOUNT) !== null && _a !== void 0 ? _a : "20"),
                    numberOfGroups: parseInt((_b = process.env.NUMBEROFGROUPS) !== null && _b !== void 0 ? _b : "4"),
                    studentList: [student._id],
                    currentSubmittedCount: 1,
                });
            }
            else {
                // Update the class's studentList and currentSubmittedCount
                if (!((_c = classData.studentList) === null || _c === void 0 ? void 0 : _c.includes(student._id))) {
                    classData.studentList = (_d = classData.studentList) !== null && _d !== void 0 ? _d : [];
                    classData.studentList.push(student._id);
                    classData.currentSubmittedCount = (_e = classData.currentSubmittedCount) !== null && _e !== void 0 ? _e : 0;
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
