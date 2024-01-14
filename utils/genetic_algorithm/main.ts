// Main.ts
import { Population } from "./population";
import { Stochastic } from "./stochastic";
import Crossover from "./crossover";
import Gene from "./gene";
import { Person } from "./person";

export class Main {
    static POPULATION_SIZE = 50;
    static GENE_LENGTH = 20;
    static GROUP_NUMBER = 5;
    static GENERATION_COUNT = 1000;
    // static FITNESS_LIMIT = 2000;
    static GENERATION_GAP = 0.9;
    static OFFSPRING_COUNT = Main.getOffspringCount();
    static CROSSOVER_PROBABILITY = 0.9;
    static MUTATION_PROBABILITY = 0.09;

    static getOffspringCount(): number {
        const count = Math.floor(Main.POPULATION_SIZE * Main.GENERATION_GAP);
        return count % 2 === 0 ? count : count + 1;
    }

    static createCustomGene(
        idArray: string[],
        homoDataArray: number[][],
        heteroDataArray: number[][]
    ): Person[] {
        const custom: Person[] = new Array(Main.GENE_LENGTH);

        // TODO: Finish iterator for creating Person objects
        // In the hetero/homo arrays get the data from the user model. Possibly can first use the Class model to get all Users in the class, then use a foreach loop instead to iterate.
        for (let i = 0; i < Main.GENE_LENGTH; i++) {
            custom[i] = new Person(
                [], // Preference
                heteroDataArray[i], // Hetero, in order as defined in weight.ts
                homoDataArray[i], // Homo, in order as defined in weight.ts,
                Number(idArray[i])
            );
        }
        return custom;
    }

    static main(
        idArray: string[],
        homoDataArray: number[][],
        heteroDataArray: number[][]
    ): number[][] {
        const population = Population.initialise(
            Main.GENE_LENGTH,
            Main.POPULATION_SIZE,
            Main.GROUP_NUMBER,
            Main.createCustomGene(idArray, homoDataArray, heteroDataArray),
            [], // Aggregate IDs
            [] // Distribute IDs
        );

        population.printPopulation();
        console.log("\n");

        // Generation loop.
        let count = 0;
        // Keep track of strongest gene ever found
        let bestGene = population.getFittestNoSort();
        while (count < Main.GENERATION_COUNT) {
            // Step 1: Stochastic Universal Sampling
            const selectedGenes: Gene[] = Stochastic.selectGenes(population, Main.OFFSPRING_COUNT);

            const limit = Main.GENE_LENGTH - 1; // Limit for randomly selecting a Person from the gene

            // Step 2: Crossover
            for (let i = 0; i < Main.OFFSPRING_COUNT; i += 2) {
                if (Math.random() <= Main.CROSSOVER_PROBABILITY) {
                    const children: [Gene, Gene] = Crossover.pmxCrossover(
                        selectedGenes[i],
                        selectedGenes[i + 1],
                        Math.floor(Math.random() * limit),
                        Math.floor(Math.random() * limit)
                    );
                    selectedGenes[i] = children[0];
                    selectedGenes[i + 1] = children[1];
                }
            }

            // Step 3: Mutation
            for (let i = 0; i < Main.OFFSPRING_COUNT; i++) {
                if (Math.random() <= Main.MUTATION_PROBABILITY) {
                    selectedGenes[i] = selectedGenes[i].mutateSwap(
                        Math.floor(Math.random() * limit),
                        Math.floor(Math.random() * limit)
                    );
                }
                if (Math.random() <= Main.MUTATION_PROBABILITY) {
                    selectedGenes[i] = selectedGenes[i].mutateInvert(
                        Math.floor(Math.random() * limit),
                        Math.floor(Math.random() * limit)
                    );
                }
            }

            // Step 4: Elitism
            const childrenPopulation = population.getFittestGenes(
                Main.POPULATION_SIZE - Main.OFFSPRING_COUNT
            );
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
