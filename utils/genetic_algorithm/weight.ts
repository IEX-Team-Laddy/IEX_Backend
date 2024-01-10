// Weight.ts
// Psuedo class reference => constants here can be used using `import * as Weight from './Weight';`
export const GENDER = 1;
export const MAJOR = 1;
export const DOER_PLANNER = 1;
export const ADAPTABILITY = 1;
export const COMMS_PROFESSIONAL = 1;
export const COMMS_GROUP = 1;
export const PROJECT_PREF = 1;
export const EXPLORE = 1;
export const MANAGE_CONFLICT = 1;

export const FEEDBACK_GIVE = 1;
export const FEEDBACK_GET = 1;
export const BIRD_OWL = 1;
export const MEETING_TIME = 1;
export const WORK_CONSISTENCY = 1;
export const MEETING_LOCATION = 1;
export const MEETING_OCCURENCE = 1;

export const heteroWeights: number[] = [
    GENDER,
    MAJOR,
    DOER_PLANNER,
    ADAPTABILITY,
    COMMS_PROFESSIONAL,
    COMMS_GROUP,
    PROJECT_PREF,
    EXPLORE,
    MANAGE_CONFLICT,
];
export const heteroWeightSum: number = heteroWeights.reduce((sum, weight) => sum + weight, 0);
export const HETERO_TOTAL_COUNT: number = heteroWeights.length;

export const homoWeights: number[] = [
    FEEDBACK_GIVE,
    FEEDBACK_GET,
    BIRD_OWL,
    MEETING_TIME,
    WORK_CONSISTENCY,
    MEETING_LOCATION,
    MEETING_OCCURENCE,
];
export const homoWeightSum: number = homoWeights.reduce((sum, weight) => sum + weight, 0);
export const HOMO_TOTAL_COUNT: number = homoWeights.length;

export const WEIGHT_HETEROGENEOUS = 0.5;
export const WEIGHT_HOMOGENEOUS = 1 - WEIGHT_HETEROGENEOUS;

export const WEIGHT_MIX = 2;
export const WEIGHT_BALANCE = 2;
export const WEIGHT_DISTRIBUTION = 0;
export const WEIGHT_PREFERENCE = 0;
export const F_TOTAL_WEIGHT = WEIGHT_MIX + WEIGHT_BALANCE + WEIGHT_DISTRIBUTION + WEIGHT_PREFERENCE;
