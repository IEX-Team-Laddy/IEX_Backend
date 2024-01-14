// Person.ts
import * as Weight from "./weight";
import Gene from "./gene";

export class Person {
    private readonly id: string;
    private readonly preferences: string[]; // Assuming preferences are stored as an array of numbers (IDs)
    private readonly heterogeneous: number[]; // Heterogeneous characteristic values in order as defined in weight.ts
    private readonly homogeneous: number[]; // Same as above but for Homogeneous characteristics

    public constructor(pref: string[], hetero: number[], homo: number[], id: string) {
        this.id = id;
        this.preferences = pref;
        this.heterogeneous = hetero;
        this.homogeneous = homo;
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

    public getId(): string {
        return this.id;
    }

    public toString(): string {
        return this.id.toString();
    }

    public getHeterogeneous(): number[] {
        return this.heterogeneous;
    }

    public getHomogeneous(): number[] {
        return this.homogeneous;
    }
}
