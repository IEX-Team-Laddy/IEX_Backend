import { Request, Response } from "express";
import { ClassModel } from "../models/Class";
import { StudentModel } from "../models/Student";
import dotenv from "dotenv";

dotenv.config();

//One user will be sending in one set of data at a time
//Once the submitted responses are received
//Send back an "OK" response

export default async function handleQuestionData(req: Request, res: Response): Promise<void> {
    try {
        const arr: Array<string & number[]> = req.body;
        console.log(arr);

        // Retrieve the data from the request body
        const className: string = arr[0];
        const studentId: string = arr[1];

        // const consent: String = arr[2]; // Ignored on purpose
        // const major: String = arr[3]; // Ignored on purpose
        // const secondMajor: String = arr[4]; // Ignored on purpose

        const faculty: string = arr[5];
        const homoData: number[] = arr[6];
        const heteroData: number[] = arr[7];
        const feedbackData: number[] = arr[8];

        // Check if the student exists
        let student = await StudentModel.findOne({ studentId });
        if (!student) {
            // Create a new student
            student = new StudentModel({
                studentId: studentId,
                homoData: homoData,
                heteroData: heteroData,
                feedbackData: feedbackData,
                faculty: faculty,
            });
        } else {
            student.homoData = homoData;
            student.heteroData = heteroData;
            student.feedbackData = feedbackData;
            student.faculty = faculty;
        }
        await student.save();

        // Check if the class exists
        let classData = await ClassModel.findOne({ className: className });
        if (!classData) {
            // Create a new class
            classData = new ClassModel({
                className: className,
                totalStudentCount: parseInt(process.env.TOTALSTUDENTCOUNT ?? "20"),
                numberOfGroups: parseInt(process.env.NUMBEROFGROUPS ?? "4"),
                studentList: [student._id],
                currentSubmittedCount: 1,
            });
        } else {
            // Update the class's studentList and currentSubmittedCount
            if (!classData.studentList?.includes(student._id)) {
                classData.studentList = classData.studentList ?? [];
                classData.studentList.push(student._id);
                classData.currentSubmittedCount = classData.currentSubmittedCount ?? 0;
                classData.currentSubmittedCount += 1;
            }
        }
        await classData.save();

        res.status(200).send("OK");
    } catch (error) {
        console.error("Error handling question data:", error);
        res.status(500).send("An error occurred");
    }
}
