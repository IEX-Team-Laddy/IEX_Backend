import mongoose, { Schema, Document } from "mongoose";

interface IStudent extends Document {
    studentId: string;
    homoData?: number[];
    heteroData?: number[];
    feedbackData?: number[];
    faculty?: string;
    allocatedGroupId?: number;
}

const studentSchema: Schema = new mongoose.Schema({
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

const StudentModel = mongoose.model<IStudent>("Student", studentSchema);

export { IStudent, StudentModel };
