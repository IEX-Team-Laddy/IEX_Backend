"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stochastic = void 0;
class Stochastic {
    static selectGenes(population, totalSelections) {
        const selectedGenes = [];
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
exports.Stochastic = Stochastic;
// At first I had this condition to prevent the same gene from being chosen multiple times
// But it led to a near infinite loop in some cases
// Still seems to work even when removing this condition
/*
if (!selectedGenes.contains(gene)) {
    selectedGenes.add(gene);
}
*/
