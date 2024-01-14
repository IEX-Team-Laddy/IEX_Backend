import mongoose, { Schema, Document } from "mongoose";

interface IStudent extends Document {
    studentId: string;
    homoData?: number[];
    heteroData?: number[];
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
    allocatedGroupId: {
        type: Number,
    },
});

const StudentModel = mongoose.model<IStudent>("Student", studentSchema);

export { IStudent, StudentModel };
