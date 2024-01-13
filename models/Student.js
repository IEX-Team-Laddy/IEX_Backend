"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const studentSchema = new mongoose_1.default.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    data: [
        {
            type: Number,
        },
    ],
    allocatedGroupId: {
        type: Number,
    },
});
const StudentModel = mongoose_1.default.model("Student", studentSchema);
exports.StudentModel = StudentModel;
