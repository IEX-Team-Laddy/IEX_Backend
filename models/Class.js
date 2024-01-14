"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
//hardcode the 2nd and 3rd variables
const classSchema = new mongoose_1.default.Schema({
    className: {
        type: String,
        required: true,
        unique: true,
    },
    totalStudentCount: {
        type: Number,
        required: true,
    },
    numberOfGroups: {
        type: Number,
        required: true,
    },
    currentSubmittedCount: {
        type: Number,
        default: 0,
    },
    studentList: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Student",
        },
    ],
});
const ClassModel = mongoose_1.default.model("Class", classSchema);
exports.ClassModel = ClassModel;
