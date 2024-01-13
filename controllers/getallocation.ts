import { Request, Response } from "express";
import { ClassModel } from "../models/Class";
import { StudentModel, IStudent } from "../models/Student";

//Check if the algorithm has published the final groupings

//Check if submitted students == total students, then return
//the final groupings by group_id
//result is an array of array whose inherent index is group_id - 1

export default async function getallocation(req: Request, res: Response): Promise<void> {
    try {
        // Retrieve the class name from the request parameters
        const { className } = req.params;

        // Fetch the class data using the className parameter
        const classData = await ClassModel.findOne({ className });

        if (!classData) {
            res.status(404).send("Class not found");
            return;
        }

        // Check if all students have submitted their data
        if (classData.currentSubmittedCount === classData.totalStudentCount) {
            // Fetch the students and their group allocations
            const students = await StudentModel.find({}, "allocatedGroupId").lean();

            // Logic to group students by allocatedGroupId
            type Groupings = Array<Array<IStudent>>;

            const groupings = students.reduce<Groupings>((acc, student) => {
                const groupId = student.allocatedGroupId ? student.allocatedGroupId - 1 : -1;
                if (groupId >= 0) {
                    if (!acc[groupId]) {
                        acc[groupId] = [];
                    }
                    acc[groupId].push(student);
                }
                return acc;
            }, []);

            // Send the groupings
            res.status(200).json(groupings);
        } else {
            // If not all students have submitted their data
            res.status(200).send("Groupings not ready yet");
        }
    } catch (error) {
        console.error("Error handling getallocation", error);
        res.status(500).send("An error occurred");
    }
}
