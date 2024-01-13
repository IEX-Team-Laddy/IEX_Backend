"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
    static createCustomGene() {
        const custom = new Array(Main.GENE_LENGTH);
        // TODO: Finish iterator for creating Person objects
        // In the hetero/homo arrays get the data from the user model. Possibly can first use the Class model to get all Users in the class, then use a foreach loop instead to iterate.
        for (let i = 0; i < Main.GENE_LENGTH; i++) {
            custom[i] = new person_1.Person([], // Preference
            [], // Hetero, in order as defined in weight.ts
            [] // Homo, in order as defined in weight.ts
            );
        }
        return custom;
    }
    static main() {
        const population = population_1.Population.initialise(Main.GENE_LENGTH, Main.POPULATION_SIZE, Main.GROUP_NUMBER, Main.createCustomGene(), [], // Aggregate IDs
        [] // Distribute IDs
        );
        population.printPopulation();
        console.log("\n");
        // Generation loop.
        let count = 0;
        // Keep track of strongest gene ever found
        let bestGene = population.getFittestNoSort();
        while (count < Main.GENERATION_COUNT && population.getTotalFitness() < Main.FITNESS_LIMIT) {
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
        // TODO: Change these to store result of fittest gene. RMB to update printAsGroup().
        population.printPopulation();
        console.log(`\n\nFittest gene: ${bestGene.toString()}`);
        bestGene.printAsGroup();
    }
}
Main.POPULATION_SIZE = 50;
Main.GENE_LENGTH = 35;
Main.GROUP_NUMBER = 7;
Main.GENERATION_COUNT = 1000;
Main.FITNESS_LIMIT = 2000;
Main.GENERATION_GAP = 0.9;
Main.OFFSPRING_COUNT = Main.getOffspringCount();
Main.CROSSOVER_PROBABILITY = 0.9;
Main.MUTATION_PROBABILITY = 0.09;
