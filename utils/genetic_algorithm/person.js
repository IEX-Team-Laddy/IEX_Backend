"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Person = void 0;
// Person.ts
const Weight = __importStar(require("./weight"));
const gene_1 = __importDefault(require("./gene"));
class Person {
    constructor(pref, hetero, homo, feedback, id, faculty) {
        this.id = id;
        this.preferences = pref;
        this.heterogeneous = hetero;
        this.homogeneous = homo;
        this.feedback = feedback;
        this.faculty = faculty;
    }
    static calcSimilarity(pair1, pair2) {
        let similaritySum = 0;
        for (let i = 0; i < Weight.HOMO_TOTAL_COUNT; i++) {
            similaritySum +=
                Weight.homoWeights[i] * Math.abs(pair1.homogeneous[i] - pair2.homogeneous[i]);
        }
        similaritySum += Weight.COHESIVENESS * Person.getCohesiveness(pair1, pair2);
        return similaritySum / (Weight.homoWeightSum + Weight.COHESIVENESS);
    }
    static getCohesiveness(pair1, pair2) {
        let forwardRelation = pair1.feedback[0] == pair2.feedback[1] ? 0 : 1;
        let backwardRelation = pair2.feedback[0] == pair1.feedback[1] ? 0 : 1;
        let sum = forwardRelation + backwardRelation;
        return sum / 2;
    }
    static calcDifference(pair1, pair2) {
        let differenceSum = 0;
        for (let i = 0; i < Weight.HETERO_TOTAL_COUNT; i++) {
            differenceSum +=
                Weight.heteroWeights[i] * Math.abs(pair1.heterogeneous[i] - pair2.heterogeneous[i]);
        }
        return 1 - differenceSum / Weight.heteroWeightSum;
    }
    static calcPreferred(pair1, pair2) {
        const first = pair1.preferences.includes(pair2.id) ? 1 : 0;
        const second = pair2.preferences.includes(pair1.id) ? 1 : 0;
        return 1 - (first + second) / 2.0;
    }
    static calcDistribution(pair1, pair2) {
        const pairId = [pair1.id, pair2.id];
        let rValue = 0;
        if (gene_1.default.aggregatedPersons.has(pairId[0]) && gene_1.default.aggregatedPersons.has(pairId[1])) {
            rValue = -1;
        }
        else if (gene_1.default.distributedPersons.has(pairId[0]) &&
            gene_1.default.distributedPersons.has(pairId[1])) {
            rValue = 1;
        }
        return rValue;
    }
    /**
     * Takes in array slice of gene (for a single group) and checks if faculty constraint is satisfied.
     * Constraint: Not more than half the group members can be from the same faculty.
     */
    static calcPenalty(group) {
        const facultyCount = {};
        for (const person of group) {
            if (facultyCount[person.faculty]) {
                facultyCount[person.faculty]++;
            }
            else {
                facultyCount[person.faculty] = 1;
            }
        }
        // If faculty exceeds half group size, give penalty of 100
        const halfGroupSize = Math.floor(group.length / 2);
        for (const count of Object.values(facultyCount)) {
            if (count > halfGroupSize) {
                return Weight.FITNESS_PENALTY;
            }
        }
        return 0; // No penalty
    }
    getId() {
        return this.id;
    }
    toString() {
        return this.id.toString();
    }
    getHeterogeneous() {
        return this.heterogeneous;
    }
    getHomogeneous() {
        return this.homogeneous;
    }
}
exports.Person = Person;
