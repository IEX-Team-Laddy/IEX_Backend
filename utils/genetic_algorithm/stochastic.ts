// Stochastic.ts
import Gene from "./Gene";
import { Population } from "./population";

export class Stochastic {
    public static selectGenes(population: Population, totalSelections: number): Gene[] {
        const selectedGenes: Gene[] = [];
        const totalFitness = population.getTotalFitness();
        const spacing = totalFitness / totalSelections;
        let pointer = Math.random() * spacing;
        let cumulativeProbability = 0;

        const currentPopulation = population.getGenes();

        while (selectedGenes.length < totalSelections) {
            for (const gene of currentPopulation) {
                cumulativeProbability += gene.getFitness();
                while (cumulativeProbability > pointer) {
                    selectedGenes.push(gene);
                    pointer += spacing;
                }
            }
        }
        return selectedGenes;
    }
}

// At first I had this condition to prevent the same gene from being chosen multiple times
// But it led to a near infinite loop in some cases
// Still seems to work even when removing this condition

/*
if (!selectedGenes.contains(gene)) {
    selectedGenes.add(gene);
}
*/
