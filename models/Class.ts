import mongoose, { Schema, Document } from "mongoose";

interface IClass extends Document {
    className: string;
    totalStudentCount: number;
    numberOfGroups: number;
    currentSubmittedCount?: number;
    studentList?: mongoose.Types.ObjectId[];
    groupings?: string[][];
}

//hardcode the 2nd and 3rd variables
const classSchema: Schema = new mongoose.Schema({
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
            type: mongoose.Schema.Types.ObjectId,
            ref: "Student",
        },
    ],
    groupings: [[String]],
});

const ClassModel = mongoose.model<IClass>("Class", classSchema);

export { ClassModel, IClass };
