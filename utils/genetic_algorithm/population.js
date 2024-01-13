"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Population = void 0;
// Import necessary classes and types
const gene_1 = __importDefault(require("./gene"));
const geneComparator_1 = require("./geneComparator");
class Population {
    constructor(geneLength, size) {
        this.genes = [];
        this.count = size;
        for (let i = 0; i < size; i++) {
            this.genes.push(new gene_1.default(geneLength));
        }
    }
    static initialise(geneLength, geneCount, groupNo, customGene, aggregate, distribute) {
        gene_1.default.setBaseInfo(geneLength, groupNo, customGene, aggregate, distribute);
        return new Population(geneLength, geneCount);
    }
    getTotalFitness() {
        return this.genes.reduce((acc, gene) => acc + gene.getFitness(), 0);
    }
    getGenes() {
        return this.genes;
    }
    /**
     * Returns {@param no} fittest genes in current population, modifies population order
     */
    getFittestGenes(no) {
        return [...this.genes].sort(geneComparator_1.GeneComparator).slice(0, no);
    }
    /**
     * Returns fittest gene in current population without modifying population order
     */
    getFittestNoSort() {
        let fittestInPopulation = this.genes[0];
        for (let i = 1; i < this.genes.length; i++) {
            if (this.genes[i].getFitness() > fittestInPopulation.getFitness()) {
                fittestInPopulation = this.genes[i];
            }
        }
        return fittestInPopulation;
    }
    /**
     * Updates population with new genes, length of {@param newGenes} must be the same as current genes
     */
    updateGenes(newGenes) {
        if (newGenes.length === this.count) {
            this.genes = newGenes;
        }
    }
    printPopulation() {
        this.genes.forEach((gene, index) => {
            console.log(`${index + 1}) ${gene.toString()}`);
            console.log(`Fitness = ${gene.getFitness()}`);
        });
        console.log(`Total Fitness = ${this.getTotalFitness()}`);
    }
    printTotalFitness() {
        console.log(`Total Fitness = ${this.getTotalFitness()}`);
    }
}
exports.Population = Population;
