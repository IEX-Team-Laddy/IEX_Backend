// Weight.ts
// Psuedo class reference => constants here can be used using `import * as Weight from './Weight';`

// Heterogeneous characteristic weights
export const GENDER = 1;
//export const MAJOR = 1;
export const ADAPT_COMFORT = 1;
export const COMMS_STYLE_PREF = 2;
export const COMMS_INITIATE_COMFORT = 2;
export const COMMS_INITIATE_CONSISTENCY = 2;
export const MANAGE_MISTAKE = 1;
export const MANAGE_CONFLICT = 1;

// Homogeneous characteristic weights
export const BIRD_OWL = 1;
export const MEETING_TIME = 1;
export const DOER_PLANNER = 2;
export const MANAGE_DEADLINE = 2;
export const WORK_CONSISTENCY = 1;
export const WORK_COMMITMENT = 1;
export const MEETING_LOCATION = 1;
export const MEETING_CONSISTENCY = 1;
export const COMMS_EFFECTIVE_IMPT = 1;
export const PROJECT_PREF = 1;
export const EXPLORE = 1;

// PENALTY
export const FITNESS_PENALTY = 1000;

// Weight of feedback qns cohesiveness. Cohesiveness is how well the feedback preferences of 2 people align, and thus is treated as a homogeneous characteristic (See calcSimilarity method in person.ts)
// Since this characteristic only exists in relation to 2 people, it cannot be stored in a Person object and must be recalculated each time.
// For feedback qns
export const COHESIVENESS = 1;

// Must contain all heterogeneous characteristics to be used for fitness calculation
export const heteroWeights: number[] = [
    GENDER,
    ADAPT_COMFORT,
    COMMS_STYLE_PREF,
    COMMS_INITIATE_COMFORT,
    COMMS_INITIATE_CONSISTENCY,
    MANAGE_MISTAKE,
    MANAGE_CONFLICT,
];
export const heteroWeightSum: number = heteroWeights.reduce((sum, weight) => sum + weight, 0);
export const HETERO_TOTAL_COUNT: number = heteroWeights.length;

// Must contain all homogeneous characteristics to be used for fitness calculation
export const homoWeights: number[] = [
    BIRD_OWL,
    MEETING_TIME,
    DOER_PLANNER,
    MANAGE_DEADLINE,
    WORK_CONSISTENCY,
    WORK_COMMITMENT,
    MEETING_LOCATION,
    MEETING_CONSISTENCY,
    COMMS_EFFECTIVE_IMPT,
    PROJECT_PREF,
    EXPLORE,
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
