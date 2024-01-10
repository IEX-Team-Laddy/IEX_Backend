import * as Weight from "./weight";
import { Person } from "./person";

export default class Gene {
    private static baseGene: Person[];
    private static meanHetero: number[];
    private static meanHomo: number[];
    private static groupIndex: number[];
    public static aggregatedPersons: Set<number> = new Set();
    public static distributedPersons: Set<number> = new Set();

    private gene: Person[];
    private fitness: number;
    private length: number;

    constructor(gene: Person[], length: number);
    constructor(length: number);
    constructor(geneOrLength: Person[] | number, length?: number) {
        if (Array.isArray(geneOrLength)) {
            this.gene = geneOrLength;
            this.length = length!;
            this.fitness = Gene.calculateFitness(this.gene);
        } else {
            this.gene = Gene.getShuffledBase();
            this.length = geneOrLength;
            this.fitness = Gene.calculateFitness(this.gene);
        }
    }

    public static setBaseInfo(
        geneLength: number,
        groupNo: number,
        customGene: Person[],
        aggregate: number[],
        distribute: number[]
    ): void {
        Gene.baseGene = customGene || Person.createPeople(geneLength);
        aggregate.forEach((person) => Gene.aggregatedPersons.add(person));
        distribute.forEach((person) => Gene.distributedPersons.add(person));

        Gene.meanHetero = new Array(Weight.HETERO_TOTAL_COUNT).fill(0);
        Gene.meanHomo = new Array(Weight.HOMO_TOTAL_COUNT).fill(0);

        Gene.baseGene.forEach((person) => {
            const hetero = person.getHeterogeneous();
            const homo = person.getHomogeneous();
            hetero.forEach((value, index) => {
                Gene.meanHetero[index] += value / geneLength;
            });
            homo.forEach((value, index) => {
                Gene.meanHomo[index] += value / geneLength;
            });
        });

        Gene.groupIndex = new Array(groupNo).fill(0).map((_, i) => {
            const remainder = geneLength % groupNo;
            const standard = Math.floor(geneLength / groupNo);
            return i < groupNo - remainder
                ? i * standard
                : i * standard + (i - (groupNo - remainder));
        });
    }

    public static getShuffledBase(): Person[] {
        const shuffled = [...Gene.baseGene];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    public static calculateFitness(gene: Person[]): number {
        let fHetero = 0;
        let fHomo = 0;
        let fBal = 0;
        let fPref = 0;
        let fDist = 0;

        for (let i = 0; i < this.groupIndex.length; i++) {
            const firstMem = this.groupIndex[i];
            const lastMem =
                i < this.groupIndex.length - 1 ? this.groupIndex[i + 1] - 1 : gene.length - 1;

            for (let j = firstMem; j < lastMem; j++) {
                for (let k = j + 1; k <= lastMem; k++) {
                    fHomo += Person.calcSimilarity(gene[j], gene[k]);
                    fHetero += Person.calcDifference(gene[j], gene[k]);
                    fPref += Person.calcPreferred(gene[j], gene[k]);
                    fDist += Person.calcDistribution(gene[j], gene[k]);
                }
            }

            const groupMeanHetero = new Array(Weight.HETERO_TOTAL_COUNT).fill(0);
            const groupMeanHomo = new Array(Weight.HOMO_TOTAL_COUNT).fill(0);

            for (let j = firstMem; j <= lastMem; j++) {
                const hetero = gene[j].getHeterogeneous();
                const homo = gene[j].getHomogeneous();

                for (let k = 0; k < Weight.HETERO_TOTAL_COUNT; k++) {
                    groupMeanHetero[k] += hetero[k] / gene.length;
                }
                for (let k = 0; k < Weight.HOMO_TOTAL_COUNT; k++) {
                    groupMeanHomo[k] += homo[k] / gene.length;
                }
            }

            for (let j = 0; j < Weight.HETERO_TOTAL_COUNT; j++) {
                fBal += Math.pow(groupMeanHetero[j] - this.meanHetero[j], 2);
            }
            for (let j = 0; j < Weight.HOMO_TOTAL_COUNT; j++) {
                fBal += Math.pow(groupMeanHomo[j] - this.meanHomo[j], 2);
            }
        }

        const fMix = fHetero * Weight.WEIGHT_HETEROGENEOUS + fHomo * Weight.WEIGHT_HOMOGENEOUS;
        return (
            Weight.F_TOTAL_WEIGHT /
            (fMix * Weight.WEIGHT_MIX +
                fBal * Weight.WEIGHT_BALANCE +
                fPref * Weight.WEIGHT_PREFERENCE +
                fDist * Weight.WEIGHT_DISTRIBUTION)
        );
    }

    public crossParent(parent2: Gene, start: number, end: number): Gene {
        const child = this.gene.slice(); // shallow copy
        const mapping = new Map<Person, Person>();

        for (let i = start; i <= end; i++) {
            mapping.set(this.gene[i], parent2.gene[i]);
        }

        for (let i = 0; i < this.length; i++) {
            if (i < start || i > end) {
                let value = parent2.gene[i];
                while (mapping.has(value)) {
                    value = mapping.get(value)!;
                }
                child[i] = value;
            }
        }
        return new Gene(child, this.length);
    }

    public mutateSwap(index1: number, index2: number): Gene {
        [this.gene[index1], this.gene[index2]] = [this.gene[index2], this.gene[index1]];
        return this;
    }

    public mutateInvert(index1: number, index2: number): Gene {
        const result = this.gene.slice(); // Copy for mutation
        let left = Math.min(index1, index2);
        let right = Math.max(index1, index2);

        while (left < right) {
            [result[left], result[right]] = [result[right], result[left]];
            left++;
            right--;
        }
        return Gene.calculateFitness(result) > this.getFitness()
            ? new Gene(result, this.length)
            : this;
    }

    public getFitness(): number {
        return this.fitness;
    }

    public toString(): string {
        return this.gene.map((person) => person.toString()).join(" ");
    }

    public printAsGroup(): void {
        console.log(`Fitness: ${this.fitness}`);
        for (let i = 0; i < Gene.groupIndex.length; i++) {
            const firstMem = Gene.groupIndex[i];
            const lastMem =
                i < Gene.groupIndex.length - 1 ? Gene.groupIndex[i + 1] - 1 : this.gene.length - 1;
            const groupList: number[] = [];
            for (let j = firstMem; j <= lastMem; j++) {
                groupList.push(this.gene[j].getId());
            }
            // Sorting the group list to maintain order.
            const sortedGroupList = groupList.sort((a, b) => a - b);
            console.log(sortedGroupList.join(" "));
        }
    }
}
