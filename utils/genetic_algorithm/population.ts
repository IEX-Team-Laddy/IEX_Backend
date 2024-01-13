// Import necessary classes and types
import Gene from "./Gene";
import { Person } from "./person";
import { GeneComparator } from "./GeneComparator";

export class Population {
    private genes: Gene[];
    private count: number;

    private constructor(geneLength: number, size: number) {
        this.genes = [];
        this.count = size;
        for (let i = 0; i < size; i++) {
            this.genes.push(new Gene(geneLength));
        }
    }

    public static initialise(
        geneLength: number,
        geneCount: number,
        groupNo: number,
        customGene: Person[],
        aggregate: number[],
        distribute: number[]
    ): Population {
        Gene.setBaseInfo(geneLength, groupNo, customGene, aggregate, distribute);
        return new Population(geneLength, geneCount);
    }

    public getTotalFitness(): number {
        return this.genes.reduce((acc, gene) => acc + gene.getFitness(), 0);
    }

    public getGenes(): Gene[] {
        return this.genes;
    }

    /**
     * Returns {@param no} fittest genes in current population, modifies population order
     */
    public getFittestGenes(no: number): Gene[] {
        return [...this.genes].sort(GeneComparator).slice(0, no);
    }

    /**
     * Returns fittest gene in current population without modifying population order
     */
    public getFittestNoSort(): Gene {
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
    public updateGenes(newGenes: Gene[]): void {
        if (newGenes.length === this.count) {
            this.genes = newGenes;
        }
    }

    public printPopulation(): void {
        this.genes.forEach((gene, index) => {
            console.log(`${index + 1}) ${gene.toString()}`);
            console.log(`Fitness = ${gene.getFitness()}`);
        });
        console.log(`Total Fitness = ${this.getTotalFitness()}`);
    }

    public printTotalFitness(): void {
        console.log(`Total Fitness = ${this.getTotalFitness()}`);
    }
}
