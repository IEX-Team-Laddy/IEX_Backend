"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
//import { runAlgorithm } from "../utils/genetic_algorithm/main";
//One user will be sending in one set of data at a time
//Once the submitted responses are received, immediately start
//running the algorithm, meanwhile send back an "OK" response to
//the last user who submitted the data
function handleQuestionData(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
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
        }
        catch (error) {
            console.error("Error handling question data:", error);
            res.status(500).send("An error occurred");
        }
    });
}
exports.default = handleQuestionData;
