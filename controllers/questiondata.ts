import { Request, Response } from "express";
import { ClassModel } from "../models/Class";
import { StudentModel } from "../models/Student";

//import { runAlgorithm } from "../utils/genetic_algorithm/main";

//One user will be sending in one set of data at a time
//Once the submitted responses are received, immediately start
//running the algorithm, meanwhile send back an "OK" response to
//the last user who submitted the data

export default async function handleQuestionData(req: Request, res: Response): Promise<void> {
    try {
        const arr: Array<String & number[]> = req.body;

        // Retrieve the data from the request body
        const className: String = arr[0];
        const studentId: String = arr[1];

        // const consent: String = arr[2]; // Ignored on purpose
        // const major: String = arr[3]; // TBC
        const homoData: number[] = arr[4];
        const heteroData: number[] = arr[5];

        // Check if the student exists
        let student = await StudentModel.findOne({ studentId });
        if (!student) {
            // Create a new student
            student = new StudentModel({
                studentId: studentId,
                homoData: homoData,
                heteroData: heteroData,
            });
        } else {
            student.homoData = homoData;
            student.heteroData = heteroData;
        }
        await student.save();

        // Check if the class exists
        let classData = await ClassModel.findOne({ className: className });
        if (!classData) {
            // Create a new class
            classData = new ClassModel({
                className: className,
                totalStudentCount: 20, // Hardcoded value
                numberOfGroups: 5, // Hardcoded value
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
