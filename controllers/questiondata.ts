import { Request, Response } from "express";
//import { runAlgorithm } from "../utils/genetic_algorithm/main";

//One user will be sending in one set of data at a time
//Once the submitted responses are received, immediately start
//running the algorithm, meanwhile send back an "OK" response to
//the last user who submitted the data

export default async function handleQuestionData(req: Request, res: Response): Promise<void> {
    try {
        // Parse the data from the request
        // Assuming data is in the request body

        // Write the data to the database
        // await writeToDatabase(questionData); //async function

        // Immediately start running your algorithm
        // runAlgorithm(); // sync function

        // Send an "OK" response back to the user
        console.log("OK!");
        console.log(req.body);
        res.status(200).send("OK");
    } catch (error) {
        console.error("Error handling question data:", error);
        res.status(500).send("An error occurred");
    }
}
