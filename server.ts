import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import mongoose from "mongoose";
import handleQuestionData from "./controllers/questiondata";
import invokeallocation from "./controllers/invokeallocation";
import matches from "./controllers/matches";

dotenv.config();

// This function sets up all the middleware for the app
function setupMiddleware(app: Express) {
    app.use(cors({ origin: "*" }));
    app.use(helmet());
    app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
    app.use(morgan("common"));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.json());
}

// This function sets up all the routes for the app
function setupRoutes(app: Express) {
    // Sending over the questionnaire data
    app.post("/questiondata", handleQuestionData);

    // Invoke the allocation algorithm
    app.get("/invokeallocation/:className", invokeallocation);

    // Return the matches to the frontend
    app.post("/matches", matches);

    // Health status checks
    app.get("/", (req: Request, res: Response) => res.send("Server deployed successfully"));
    app.head("/", (req: Request, res: Response) => res.end());
}

// Function to get the appropriate MongoDB URI based on environment variable
function getMongoDBUri(): string {
    const testing = process.env.TESTING?.toLowerCase() === 'true';
    return testing ? process.env.MONGODB_URI_TEST || '' : process.env.MONGODB_URI || '';
}

async function connectDatabase() {
    try {
        const mongoUri = getMongoDBUri();
        if (mongoUri) {
            await mongoose.connect(mongoUri);
            console.log("MongoDB Connected...");
        } else {
            throw new Error("MongoDB URI not set");
        }
    } catch (error) {
        console.error("Failed to connect to MongoDB ", error);
        process.exit(1);
    }
}

async function start() {
    const app: Express = express();
    setupMiddleware(app);
    setupRoutes(app);
    await connectDatabase();

    app.listen(process.env.PORT || 3001, () =>
        console.log(`SERVER STARTED ON ${process.env.REACT_APP_SERVER_URL || 3001}`)
    );
}

start();

// function printMemoryUsage() {
//     const usage = process.memoryUsage();
//     console.log(`Memory Usage:
//     RSS ${Math.round((usage.rss / 1024 / 1024) * 100) / 100} MB
//     Heap Total ${Math.round((usage.heapTotal / 1024 / 1024) * 100) / 100} MB
//     Heap Used ${Math.round((usage.heapUsed / 1024 / 1024) * 100) / 100} MB
//     External ${Math.round((usage.external / 1024 / 1024) * 100) / 100} MB`);
// }

// // Use the function
// printMemoryUsage();
// setInterval(() => {
//     printMemoryUsage();
// }, 10000); // Prints memory usage every 10 seconds
