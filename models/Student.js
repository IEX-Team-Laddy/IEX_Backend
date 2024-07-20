"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const studentSchema = new mongoose_1.default.Schema({
    studentId: {
        type: String,
        required: true,
        unique: true,
    },
    homoData: [
        {
            type: Number,
        },
    ],
    heteroData: [
        {
            type: Number,
        },
    ],
    feedbackData: [
        {
            type: Number,
        }
    ],
    faculty: {
        type: String,
    },
    allocatedGroupId: {
        type: Number,
    },
});
const StudentModel = mongoose_1.default.model("Student", studentSchema);
exports.StudentModel = StudentModel;
