"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Crossover {
    /**
     * Generates 2 child genes from the 2 input parent genes. Child genes are generated using 2 random array indexes.
     * @param parent1 The first parent gene.
     * @param parent2 The second parent gene.
     * @param random1 The first random index.
     * @param random2 The second random index.
     * @return Tuple containing the two child genes.
     */
    static pmxCrossover(parent1, parent2, random1, random2) {
        const leftBound = Math.min(random1, random2);
        const rightBound = Math.max(random1, random2);
        const child1 = parent1.crossParent(parent2, leftBound, rightBound);
        const child2 = parent2.crossParent(parent1, leftBound, rightBound);
        return [child1, child2];
    }
}
exports.default = Crossover;
