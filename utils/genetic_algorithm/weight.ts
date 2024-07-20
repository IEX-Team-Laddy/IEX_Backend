// Weight.ts
// Psuedo class reference => constants here can be used using `import * as Weight from './Weight';`

// Heterogeneous characteristic weights
export const GENDER = 1;
export const ADAPTING_COMFORT = 1;
export const INITIATING_CONVO = 3;
export const INITIATING_FREQUENCY = 3;
export const HANDLE_MISTAKE = 1;
export const HANDLE_CONFLICT = 1;

// Homogeneous characteristic weights
export const START_COLLAB = 1;
export const WORK_HOUR = 1;
export const MEETING_HOUR = 1;
export const WORK_APPROACH = 3;
export const MANAGE_DEADLINE = 3;
export const WORK_CONSISTENCY = 1;
export const MEETING_STYLE = 1;
export const MEETING_FREQUENCY = 1;
export const EFFECTIVE_COMMS = 1;
export const CHALLENGE_PREF = 1;
export const EXPLORE_COMFORT = 1;
export const HANDLE_STRESS = 1;
export const IDEAL_GROUP_SIZE = 1;
export const HANGOUT_ACT_PREF = 1;

// PENALTY
export const FITNESS_PENALTY = 1000;

// Weight of feedback qns cohesiveness. Cohesiveness is how well the feedback preferences of 2 people align, and thus is treated as a homogeneous characteristic (See calcSimilarity method in person.ts)
// Since this characteristic only exists in relation to 2 people, it cannot be stored in a Person object and must be recalculated each time.
// For feedback qns
export const COHESIVENESS = 1;

// Must contain all heterogeneous characteristics to be used for fitness calculation
export const heteroWeights: number[] = [
    GENDER,
    ADAPTING_COMFORT,
    INITIATING_CONVO,
    INITIATING_FREQUENCY,
    HANDLE_MISTAKE,
    HANDLE_CONFLICT
];
export const heteroWeightSum: number = heteroWeights.reduce((sum, weight) => sum + weight, 0);
export const HETERO_TOTAL_COUNT: number = heteroWeights.length;

// Must contain all homogeneous characteristics to be used for fitness calculation
export const homoWeights: number[] = [
    START_COLLAB,
    WORK_HOUR,
    MEETING_HOUR,
    WORK_APPROACH,
    MANAGE_DEADLINE,
    WORK_CONSISTENCY,
    MEETING_STYLE,
    MEETING_FREQUENCY,
    EFFECTIVE_COMMS,
    CHALLENGE_PREF,
    EXPLORE_COMFORT,
    HANDLE_STRESS,
    IDEAL_GROUP_SIZE,
    HANGOUT_ACT_PREF
];

export const homoWeightSum: number = homoWeights.reduce((sum, weight) => sum + weight, 0);
export const HOMO_TOTAL_COUNT: number = homoWeights.length;

// Weights of fHetero and fHomo, sum is 1
export const WEIGHT_HETEROGENEOUS = 0.5;
export const WEIGHT_HOMOGENEOUS = 1 - WEIGHT_HETEROGENEOUS;

// Weights of fMix, fBal, fDist, fPref
export const WEIGHT_MIX = 2;
export const WEIGHT_BALANCE = 2;
export const WEIGHT_DISTRIBUTION = 0;
export const WEIGHT_PREFERENCE = 0;
export const F_TOTAL_WEIGHT = WEIGHT_MIX + WEIGHT_BALANCE + WEIGHT_DISTRIBUTION + WEIGHT_PREFERENCE;
