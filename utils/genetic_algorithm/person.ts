// Person.ts
import * as Weight from "./weight";
import Gene from "./Gene";

export class Person {
    private static globalId = 0;

    private readonly id: number;
    private readonly preferences: number[]; // Assuming preferences are stored as an array of numbers (IDs)
    private readonly heterogeneous: number[];
    private readonly homogeneous: number[];

    public constructor();
    public constructor(pref: number[], hetero: number[], homo: number[]);
    public constructor(pref?: number[], hetero?: number[], homo?: number[]) {
        this.id = Person.globalId++;
        this.preferences = pref || [];
        this.heterogeneous = hetero || Person.randomCharacteristics(Weight.heteroWeights.length);
        this.homogeneous = homo || Person.randomCharacteristics(Weight.homoWeights.length);
    }

    public static createPeople(length: number): Person[] {
        return Array.from({ length }, () => new Person());
    }

    public static calcSimilarity(pair1: Person, pair2: Person): number {
        let similaritySum = 0;
        for (let i = 0; i < Weight.HOMO_TOTAL_COUNT; i++) {
            similaritySum +=
                Weight.homoWeights[i] * Math.abs(pair1.homogeneous[i] - pair2.homogeneous[i]);
        }
        return similaritySum / Weight.homoWeightSum;
    }

    public static calcDifference(pair1: Person, pair2: Person): number {
        let differenceSum = 0;
        for (let i = 0; i < Weight.HETERO_TOTAL_COUNT; i++) {
            differenceSum +=
                Weight.heteroWeights[i] * Math.abs(pair1.heterogeneous[i] - pair2.heterogeneous[i]);
        }
        return 1 - differenceSum / Weight.heteroWeightSum;
    }

    public static calcPreferred(pair1: Person, pair2: Person): number {
        const first = pair1.preferences.includes(pair2.id) ? 1 : 0;
        const second = pair2.preferences.includes(pair1.id) ? 1 : 0;
        return 1 - (first + second) / 2.0;
    }

    public static calcDistribution(pair1: Person, pair2: Person): number {
        const pairId = [pair1.id, pair2.id];
        let rValue = 0;
        if (Gene.aggregatedPersons.has(pairId[0]) && Gene.aggregatedPersons.has(pairId[1])) {
            rValue = -1;
        } else if (
            Gene.distributedPersons.has(pairId[0]) &&
            Gene.distributedPersons.has(pairId[1])
        ) {
            rValue = 1;
        }
        return rValue;
    }

    public getId(): number {
        return this.id;
    }

    public toString(): string {
        return this.id.toString();
    }

    private static randomCharacteristics(count: number): number[] {
        return Array.from({ length: count }, () => Math.random());
    }

    public getHeterogeneous(): number[] {
        return this.heterogeneous;
    }

    public getHomogeneous(): number[] {
        return this.homogeneous;
    }
}
