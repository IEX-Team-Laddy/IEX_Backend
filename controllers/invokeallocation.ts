import { Request, Response } from "express";
import { ClassModel } from "../models/Class";
import { IStudent } from "../models/Student";
import { Main } from "../utils/genetic_algorithm/main";

//Check if the algorithm has published the final groupings

//Check if submitted students == total students, then return
//the final groupings by group_id
//result is an array of array whose inherent index is group_id - 1

export default async function invokeallocation(req: Request, res: Response): Promise<void> {
    try {
        // Retrieve the class name from the request parameters
        const { className } = req.params;

        // Fetch the class data using the className parameter
        const classData = await ClassModel.findOne({ className }).populate("studentList");

        if (!classData) {
            res.status(404).send("Class not found");
            return;
        } else {
            const studentList = classData.studentList
                ? ((classData.studentList as unknown) as IStudent[])
                : [];

            const idArray: string[] = studentList?.map((student) => student.studentId) || [];
            const homoDataArray: number[][] =
                studentList?.map((student) => student.homoData || []) || [];
            const heteroDataArray: number[][] =
                studentList?.map((student) => student.heteroData || []) || [];

            if (classData.currentSubmittedCount === classData.totalStudentCount) {
                const groupings = Main.main(idArray, homoDataArray, heteroDataArray);
                // Save the groupings
                classData.groupings = groupings;
                res.status(200).json("Successfully ran the algo and saved the data");
            } else {
                // If not all students have submitted their data
                res.status(400).send("Groupings not ready yet");
            }
        }
    } catch (error) {
        console.error("Error handling getallocation", error);
        res.status(500).send("An error occurred");
    }
}