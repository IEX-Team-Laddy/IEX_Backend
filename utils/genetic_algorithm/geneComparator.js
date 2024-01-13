"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeneComparator = void 0;
// GeneComparator.ts
function GeneComparator(g1, g2) {
    const fitness1 = g1.getFitness();
    const fitness2 = g2.getFitness();
    if (fitness1 < fitness2) {
        return 1; // if g1 should come after g2
    }
    else if (fitness1 > fitness2) {
        return -1; // if g1 should come before g2
    }
    else {
        return 0; // if g1 and g2 are equal
    }
}
exports.GeneComparator = GeneComparator;
