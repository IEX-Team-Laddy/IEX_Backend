"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Main = void 0;
// Main.ts
const population_1 = require("./population");
const stochastic_1 = require("./stochastic");
const crossover_1 = __importDefault(require("./crossover"));
const person_1 = require("./person");
class Main {
    static getOffspringCount() {
        const count = Math.floor(Main.POPULATION_SIZE * Main.GENERATION_GAP);
        return count % 2 === 0 ? count : count + 1;
    }
    /**
     * Main method to run the genetic algorithm
     * @param idArray  Array of student IDs
     * @param homoDataArray Array of homoData for each student, in order as defined in weight.ts
     * @param heteroDataArray Array of heteroData for each student, in order as defined in weight.ts
     * @param feedbackDataArray Array of feedbackData (feedback give/receive preference) for each student
     * @param facultyArray Faculties for each student
     * @param enablePenalty Whether to enable penalty system for fitness calculation
     * @param geneLength Number of students
     * @param groupCount Number of groups to form (auto balances group sizes, remainder split evenly)
     * @returns
     */
    static main(idArray, homoDataArray, heteroDataArray, feedbackDataArray, facultyArray, enablePenalty, geneLength, groupCount) {
        this.GENE_LENGTH = geneLength;
        this.GROUP_NUMBER = groupCount;
        // Create starting gene
        const custom = new Array(Main.GENE_LENGTH);
        for (let i = 0; i < Main.GENE_LENGTH; i++) {
            custom[i] = new person_1.Person([], // Personal preference for each student, not used for now
            heteroDataArray[i], homoDataArray[i], feedbackDataArray[i], idArray[i], facultyArray[i]);
        }
        // Initialise population for iterations
        const population = population_1.Population.initialise(Main.GENE_LENGTH, Main.POPULATION_SIZE, Main.GROUP_NUMBER, custom, [], // Aggregate IDs
        [], // Distribute IDs
        enablePenalty);
        population.printPopulation();
        console.log("\n");
        // Generation loop.
        let count = 0;
        // Keep track of strongest gene ever found
        let bestGene = population.getFittestNoSort();
        while (count < Main.GENERATION_COUNT) {
            // Step 1: Stochastic Universal Sampling
            const selectedGenes = stochastic_1.Stochastic.selectGenes(population, Main.OFFSPRING_COUNT);
            const limit = Main.GENE_LENGTH - 1; // Limit for randomly selecting a Person from the gene
            // Step 2: Crossover
            for (let i = 0; i < Main.OFFSPRING_COUNT; i += 2) {
                if (Math.random() <= Main.CROSSOVER_PROBABILITY) {
                    const children = crossover_1.default.pmxCrossover(selectedGenes[i], selectedGenes[i + 1], Math.floor(Math.random() * limit), Math.floor(Math.random() * limit));
                    selectedGenes[i] = children[0];
                    selectedGenes[i + 1] = children[1];
                }
            }
            // Step 3: Mutation
            for (let i = 0; i < Main.OFFSPRING_COUNT; i++) {
                if (Math.random() <= Main.MUTATION_PROBABILITY) {
                    selectedGenes[i] = selectedGenes[i].mutateSwap(Math.floor(Math.random() * limit), Math.floor(Math.random() * limit));
                }
                if (Math.random() <= Main.MUTATION_PROBABILITY) {
                    selectedGenes[i] = selectedGenes[i].mutateInvert(Math.floor(Math.random() * limit), Math.floor(Math.random() * limit));
                }
            }
            // Step 4: Elitism
            const childrenPopulation = population.getFittestGenes(Main.POPULATION_SIZE - Main.OFFSPRING_COUNT);
            childrenPopulation.push(...selectedGenes);
            population.updateGenes(childrenPopulation);
            // Step 5: Update best gene ever found
            const fittestInPopulation = population.getFittestNoSort();
            if (fittestInPopulation.getFitness() > bestGene.getFitness()) {
                bestGene = fittestInPopulation;
            }
            count++;
        }
        return bestGene.returnGroup();
    }
}
exports.Main = Main;
Main.POPULATION_SIZE = 50; // number of genes in a population
Main.GENE_LENGTH = 20; // default, changed in main()
Main.GROUP_NUMBER = 4; // default, changed in main()
Main.GENERATION_COUNT = 1000;
Main.GENERATION_GAP = 0.9;
Main.OFFSPRING_COUNT = Main.getOffspringCount();
Main.CROSSOVER_PROBABILITY = 0.9;
Main.MUTATION_PROBABILITY = 0.09;
