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
Object.defineProperty(exports, "__esModule", { value: true });
const Weight = __importStar(require("./weight"));
const person_1 = require("./person");
class Gene {
    constructor(geneOrLength, length, fitness) {
        if (Array.isArray(geneOrLength)) {
            this.gene = geneOrLength;
            this.length = length;
            this.fitness = fitness;
        }
        else {
            this.gene = Gene.getShuffledBase();
            this.length = geneOrLength;
            this.fitness = Gene.calculateFitness(this.gene);
        }
    }
    /**
     * Sets base information for algorithm such as initial members of gene, aggregations/distributions etc.
     * @param geneLength
     * @param groupNo
     * @param startingGene
     * @param aggregate Persons (id's) to be grouped together
     * @param distribute Persons (id's) to be separated from each other
     */
    static setBaseInfo(geneLength, groupNo, startingGene, aggregate, distribute) {
        Gene.baseGene = startingGene;
        aggregate.forEach((person) => Gene.aggregatedPersons.add(person));
        distribute.forEach((person) => Gene.distributedPersons.add(person));
        // Set mean value of population for each hetero/homo characteristic
        Gene.meanHetero = new Array(Weight.HETERO_TOTAL_COUNT).fill(0);
        Gene.meanHomo = new Array(Weight.HOMO_TOTAL_COUNT).fill(0);
        Gene.baseGene.forEach((person) => {
            const hetero = person.getHeterogeneous();
            const homo = person.getHomogeneous();
            hetero.forEach((value, index) => {
                Gene.meanHetero[index] += value / geneLength;
            });
            homo.forEach((value, index) => {
                Gene.meanHomo[index] += value / geneLength;
            });
        });
        // Store index of 1st member of each group within a gene (for group based calculations, difference in size between any 2 groups <= 1)
        Gene.groupIndex = new Array(groupNo).fill(0).map((_, i) => {
            const remainder = geneLength % groupNo;
            const standard = Math.floor(geneLength / groupNo);
            return i < groupNo - remainder
                ? i * standard
                : i * standard + (i - (groupNo - remainder));
        });
    }
    /**
     * Shuffles base gene for initial population generation
     * @returns Randomly shuffled copy of base gene
     */
    static getShuffledBase() {
        const shuffled = [...Gene.baseGene];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }
    /**
     * Calculates Fitness of gene based on fMix (fHetero & fHomo), fBal, fPref and fDist
     * @param gene Gene requiring fitness calculation
     * @returns
     */
    static calculateFitness(gene) {
        let fHetero = 0;
        let fHomo = 0;
        let fBal = 0;
        let fPref = 0;
        let fDist = 0;
        // For each group in a gene
        for (let i = 0; i < this.groupIndex.length; i++) {
            const firstMem = this.groupIndex[i];
            const lastMem = i < this.groupIndex.length - 1 ? this.groupIndex[i + 1] - 1 : gene.length - 1;
            // For each pair in group
            for (let j = firstMem; j < lastMem; j++) {
                for (let k = j + 1; k <= lastMem; k++) {
                    fHomo += person_1.Person.calcSimilarity(gene[j], gene[k]);
                    fHetero += person_1.Person.calcDifference(gene[j], gene[k]);
                    fPref += person_1.Person.calcPreferred(gene[j], gene[k]);
                    fDist += person_1.Person.calcDistribution(gene[j], gene[k]);
                }
            }
            // For fBal calculation, calculate mean value of each attribute for each group member
            const groupMeanHetero = new Array(Weight.HETERO_TOTAL_COUNT).fill(0);
            const groupMeanHomo = new Array(Weight.HOMO_TOTAL_COUNT).fill(0);
            for (let j = firstMem; j <= lastMem; j++) {
                const hetero = gene[j].getHeterogeneous();
                const homo = gene[j].getHomogeneous();
                for (let k = 0; k < Weight.HETERO_TOTAL_COUNT; k++) {
                    groupMeanHetero[k] += hetero[k] / gene.length;
                }
                for (let k = 0; k < Weight.HOMO_TOTAL_COUNT; k++) {
                    groupMeanHomo[k] += homo[k] / gene.length;
                }
            }
            for (let j = 0; j < Weight.HETERO_TOTAL_COUNT; j++) {
                fBal += Math.pow(groupMeanHetero[j] - this.meanHetero[j], 2);
            }
            for (let j = 0; j < Weight.HOMO_TOTAL_COUNT; j++) {
                fBal += Math.pow(groupMeanHomo[j] - this.meanHomo[j], 2);
            }
        }
        const fMix = fHetero * Weight.WEIGHT_HETEROGENEOUS + fHomo * Weight.WEIGHT_HOMOGENEOUS;
        // Fitness = 1 / F, hence numerator & denominator inverted
        return (Weight.F_TOTAL_WEIGHT /
            (fMix * Weight.WEIGHT_MIX +
                fBal * Weight.WEIGHT_BALANCE +
                fPref * Weight.WEIGHT_PREFERENCE +
                fDist * Weight.WEIGHT_DISTRIBUTION));
    }
    crossParent(parent2, start, end) {
        const child = this.gene.slice(); // shallow copy
        const mapping = new Map();
        for (let i = start; i <= end; i++) {
            mapping.set(this.gene[i], parent2.gene[i]);
        }
        for (let i = 0; i < this.length; i++) {
            if (i < start || i > end) {
                let value = parent2.gene[i];
                while (mapping.has(value)) {
                    value = mapping.get(value);
                }
                child[i] = value;
            }
        }
        return new Gene(child, this.length, Gene.calculateFitness(child));
    }
    /**
     * Performs swap mutation using randomly generated indexes {@param start} and {@param end}.
     */
    mutateSwap(index1, index2) {
        [this.gene[index1], this.gene[index2]] = [this.gene[index2], this.gene[index1]];
        return this;
    }
    /**
     * Performs invert mutation, with condition to only apply when result is fitter than input.
     * Uses randomly generated indexes {@param start} and {@param end}.
     */
    mutateInvert(index1, index2) {
        const result = this.gene.slice(); // Copy for mutation
        let left = Math.min(index1, index2);
        let right = Math.max(index1, index2);
        while (left < right) {
            [result[left], result[right]] = [result[right], result[left]];
            left++;
            right--;
        }
        const resultFitness = Gene.calculateFitness(result);
        return resultFitness > this.getFitness()
            ? new Gene(result, this.length, resultFitness)
            : this;
    }
    getFitness() {
        return this.fitness;
    }
    toString() {
        return this.gene.map((person) => person.toString()).join(" ");
    }
    // TODO: change output from a console log -> store data in db or smthg
    returnGroup() {
        let arr = [];
        for (let i = 0; i < Gene.groupIndex.length; i++) {
            const firstMem = Gene.groupIndex[i];
            const lastMem = i < Gene.groupIndex.length - 1 ? Gene.groupIndex[i + 1] - 1 : this.gene.length - 1;
            const groupList = [];
            for (let j = firstMem; j <= lastMem; j++) {
                groupList.push(this.gene[j].getId());
            }
            arr.push(groupList);
        }
        return arr;
    }
}
Gene.aggregatedPersons = new Set();
Gene.distributedPersons = new Set();
exports.default = Gene;
