import mongoose, { Schema, Document } from "mongoose";

interface IStudent extends Document {
    email: string;
    data?: Number[];
    allocatedGroupId?: number;
}

const studentSchema: Schema = new mongoose.Schema({
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

const StudentModel = mongoose.model<IStudent>("Student", studentSchema);

export { IStudent, StudentModel };
