// Main.ts
import { Population } from "./population";
import { Stochastic } from "./stochastic";
import Crossover from "./crossover";
import Gene from "./gene";
import { Person } from "./person";

export class Main {
    static POPULATION_SIZE = 50; // number of genes in a population
    static GENE_LENGTH = 20; // default, changed in main()
    static GROUP_NUMBER = 4; // default, changed in main()
    static GENERATION_COUNT = 1000;
    static GENERATION_GAP = 0.9;
    static OFFSPRING_COUNT = Main.getOffspringCount();
    static CROSSOVER_PROBABILITY = 0.9;
    static MUTATION_PROBABILITY = 0.09;

    static getOffspringCount(): number {
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
    static main(
        idArray: string[],
        homoDataArray: number[][],
        heteroDataArray: number[][],
        feedbackDataArray: number[][],
        facultyArray: string[],
        enablePenalty: boolean,
        geneLength: number,
        groupCount: number
    ): string[][] {
        this.GENE_LENGTH = geneLength;
        this.GROUP_NUMBER = groupCount;

        // Create starting gene
        const custom: Person[] = new Array(Main.GENE_LENGTH);
        for (let i = 0; i < Main.GENE_LENGTH; i++) {
            custom[i] = new Person(
                [], // Personal preference for each student, not used for now
                heteroDataArray[i],
                homoDataArray[i],
                feedbackDataArray[i],
                idArray[i],
                facultyArray[i]
            );
        }

        // Initialise population for iterations
        const population = Population.initialise(
            Main.GENE_LENGTH,
            Main.POPULATION_SIZE,
            Main.GROUP_NUMBER,
            custom,
            [], // Aggregate IDs
            [], // Distribute IDs
            enablePenalty
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
