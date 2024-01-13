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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
// import mongoose from "mongoose";
const questiondata_1 = __importDefault(require("./controllers/questiondata"));
const getallocation_1 = __importDefault(require("./controllers/getallocation"));
dotenv_1.default.config();
// This function sets up all the middleware for the app
function setupMiddleware(app) {
    app.use((0, cors_1.default)({ origin: process.env.REACT_APP_URL }));
    app.use((0, helmet_1.default)());
    app.use(helmet_1.default.crossOriginResourcePolicy({ policy: "cross-origin" }));
    app.use((0, morgan_1.default)("common"));
    app.use(body_parser_1.default.urlencoded({ extended: true }));
    app.use(express_1.default.json());
}
// This function sets up all the routes for the app
function setupRoutes(app) {
    //Sending over the questionaire data
    app.post("/questiondata", questiondata_1.default);
    //Probably a pulse check to see if the algorithm has published
    //the results of the algorithm
    //Will return false until the data is ready
    app.get("/getallocation", getallocation_1.default);
    //Health status checks
    app.get("/", (req, res) => res.send("Server deployed successfully"));
    app.head("/", (req, res) => res.end());
}
// async function connectDatabase() {
//     try {
//         await mongoose.connect(process.env.MONGODB_URI, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         });
//         console.log("MongoDB Connected...");
//     } catch (error) {
//         console.error("Failed to connect to MongoDB ", error);
//         process.exit(1);
//     }
// }
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = (0, express_1.default)();
        setupMiddleware(app);
        setupRoutes(app);
        //await connectDatabase();
        app.listen(process.env.PORT || 3001, () => console.log(`SERVER STARTED ON ${process.env.REACT_APP_SERVER_URL}`));
    });
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
