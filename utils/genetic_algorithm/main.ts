// Main.ts
import { Population } from "./population";
import { Stochastic } from "./stochastic";
import Crossover from "./crossover";
import Gene from "./Gene";
import { Person } from "./person";

class Main {
    static POPULATION_SIZE = 50;
    static GENE_LENGTH = 35;
    static GROUP_NUMBER = 7;
    static GENERATION_COUNT = 1000;
    static FITNESS_LIMIT = 1.692;
    static GENERATION_GAP = 0.9;
    static OFFSPRING_COUNT = Main.getOffspringCount();
    static CROSSOVER_PROBABILITY = 0.9;
    static MUTATION_PROBABILITY = 0.09;

    static getOffspringCount(): number {
        const count = Math.floor(Main.POPULATION_SIZE * Main.GENERATION_GAP);
        return count % 2 === 0 ? count : count + 1;
    }

    static createCustomGene(): Person[] {
        const custom: Person[] = new Array(Main.GENE_LENGTH);

        custom[0] = new Person(
            [],
            [0, 0, 0.25, 0.75, 1.0, 1.0, 1.0, 1.0, 1.0],
            [0.0, 0.0, 0, 0, 1, 0.0, 0.0]
        );
        custom[1] = new Person(
            [],
            [0, 0, 0.25, 0.75, 1.0, 1.0, 1.0, 0.75, 1.0],
            [0.33, 1.0, 1, 1, 1, 0.0, 0.5]
        );
        custom[2] = new Person(
            [],
            [0, 1, 0.75, 0.25, 0.5, 0.75, 0.25, 0.75, 0.75],
            [0.67, 1.0, 1, 1, 0, 0.5, 0.25]
        );
        custom[3] = new Person(
            [],
            [1, 1, 0.5, 0.25, 1.0, 1.0, 0.0, 0.5, 0.75],
            [0.33, 0.33, 1, 0, 1, 0.5, 0.25]
        );
        custom[4] = new Person(
            [],
            [0, 0, 0.75, 0.5, 0.5, 0.75, 0.75, 0.75, 0.5],
            [0.67, 1.0, 0, 1, 1, 0.5, 0.25]
        );

        custom[5] = new Person(
            [],
            [0, 0, 0.5, 0.25, 0.75, 0.75, 0.75, 0.75, 0.5],
            [1.0, 0.33, 1, 1, 0, 0.0, 0.25]
        );
        custom[6] = new Person(
            [],
            [0, 0, 0.25, 0.75, 0.5, 1.0, 0.0, 0.75, 1.0],
            [1.0, 1.0, 1, 1, 1, 0.5, 0.0]
        );
        custom[7] = new Person(
            [],
            [0, 0, 0.0, 0.25, 0.75, 0.75, 0.0, 0.75, 0.75],
            [0.0, 0.0, 1, 1, 0, 1.0, 0.0]
        );
        custom[8] = new Person(
            [],
            [0, 1, 0.0, 1.0, 1.0, 1.0, 1.0, 0.75, 0.75],
            [1.0, 1.0, 1, 1, 1, 0.5, 0.0]
        );
        custom[9] = new Person(
            [],
            [0, 0, 0.75, 0.75, 1.0, 0.5, 1.0, 1.0, 0.25],
            [0.33, 0.33, 1, 0, 1, 0.5, 0.0]
        );

        custom[10] = new Person(
            [],
            [0, 0, 0.5, 0.25, 1.0, 0.75, 1.0, 0.75, 0.75],
            [0.0, 0.0, 0, 0, 1, 0.5, 0.0]
        );
        custom[11] = new Person(
            [],
            [0, 1, 0.5, 1.0, 1.0, 1.0, 0.75, 1.0, 0.75],
            [0.33, 0.33, 1, 1, 1, 0.0, 0.5]
        );
        custom[12] = new Person(
            [],
            [1, 1, 0.25, 0.5, 0.75, 0.75, 0.5, 0.75, 0.75],
            [1.0, 0.33, 1, 0, 1, 0.5, 0.25]
        );
        custom[13] = new Person(
            [],
            [1, 0, 0.75, 0.5, 1.0, 1.0, 0.75, 0.75, 0.5],
            [0.67, 0.67, 1, 0, 0, 0.5, 0.25]
        );
        custom[25] = new Person(
            [],
            [0, 1, 0.75, 0.75, 0.5, 0.75, 1.0, 1.0, 0.75],
            [0.0, 1.0, 1, 1, 0, 0.0, 0.5]
        );
        custom[26] = new Person(
            [],
            [0, 0, 1.0, 0.5, 0.25, 0.25, 0.75, 0.75, 0.5],
            [0.0, 0.33, 1, 0, 0, 0.0, 0.0]
        );
        custom[27] = new Person(
            [],
            [1, 1, 0.25, 0.25, 0.5, 0.5, 0.75, 0.75, 0.75],
            [1.0, 0.33, 1, 1, 1, 0.5, 0.25]
        );
        custom[28] = new Person(
            [],
            [1, 1, 0.75, 0.5, 0.75, 0.5, 1.0, 0.75, 0.5],
            [0.33, 0.67, 1, 1, 0, 0.5, 0.5]
        );
        custom[29] = new Person(
            [],
            [0, 1, 0.25, 0.75, 0.75, 0.75, 0.75, 0.75, 0.5],
            [0.33, 0.33, 1, 1, 1, 0.5, 0.5]
        );

        custom[30] = new Person(
            [],
            [1, 0, 0.5, 0.75, 0.75, 0.5, 0.25, 0.75, 0.25],
            [0.33, 0.33, 1, 1, 1, 0.0, 0.25]
        );
        custom[31] = new Person(
            [],
            [1, 0, 0.75, 1.0, 0.75, 0.75, 0.75, 1.0, 0.75],
            [0.33, 1.0, 0, 0, 1, 0.5, 0.5]
        );
        custom[32] = new Person(
            [],
            [1, 1, 0.5, 0.75, 1.0, 0.75, 0.75, 0.75, 0.75],
            [0.0, 0.0, 0, 1, 1, 0.5, 0.0]
        );
        custom[33] = new Person(
            [],
            [1, 0, 1.0, 0.75, 0.75, 1.0, 0.75, 0.75, 1.0],
            [0.33, 0.33, 1, 1, 1, 0.0, 0.5]
        );
        custom[34] = new Person(
            [],
            [1, 0, 0.75, 0.5, 0.75, 0.75, 0.75, 1.0, 0.5],
            [0.33, 0.33, 1, 1, 1, 0.0, 0.25]
        );

        return custom;
    }

    static main(): void {
        const population = Population.initialise(
            Main.GENE_LENGTH,
            Main.POPULATION_SIZE,
            Main.GROUP_NUMBER,
            Main.createCustomGene(),
            [], // Aggregate IDs
            [] // Distribute IDs
        );

        population.printPopulation();
        console.log("\n");

        let count = 0;
        while (count < Main.GENERATION_COUNT && population.getTotalFitness() < Main.FITNESS_LIMIT) {
            const selectedGenes: Gene[] = Stochastic.selectGenes(population, Main.OFFSPRING_COUNT);
            const limit = Main.GENE_LENGTH - 1;

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

            const childrenPopulation = population.getFittestGenes(
                Main.POPULATION_SIZE - Main.OFFSPRING_COUNT
            );
            childrenPopulation.push(...selectedGenes);
            population.updateGenes(childrenPopulation);

            console.log(`Generation: ${count}`);
            population.printTotalFitness();

            count++;
        }

        population.printPopulation();
        const fittest = population.getFittestGenes(1)[0];
        console.log(`\n\nFittest gene: ${fittest.toString()}`);
        fittest.printAsGroup();
    }
}

// Run the main method
Main.main();
