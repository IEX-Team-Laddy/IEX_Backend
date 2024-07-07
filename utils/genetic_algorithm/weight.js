"use strict";
// Weight.ts
// Psuedo class reference => constants here can be used using `import * as Weight from './Weight';`
Object.defineProperty(exports, "__esModule", { value: true });
exports.F_TOTAL_WEIGHT = exports.WEIGHT_PREFERENCE = exports.WEIGHT_DISTRIBUTION = exports.WEIGHT_BALANCE = exports.WEIGHT_MIX = exports.WEIGHT_HOMOGENEOUS = exports.WEIGHT_HETEROGENEOUS = exports.HOMO_TOTAL_COUNT = exports.homoWeightSum = exports.homoWeights = exports.HETERO_TOTAL_COUNT = exports.heteroWeightSum = exports.heteroWeights = exports.COHESIVENESS = exports.EXPLORE = exports.PROJECT_PREF = exports.COMMS_EFFECTIVE_IMPT = exports.MEETING_CONSISTENCY = exports.MEETING_LOCATION = exports.WORK_COMMITMENT = exports.WORK_CONSISTENCY = exports.MANAGE_DEADLINE = exports.DOER_PLANNER = exports.MEETING_TIME = exports.BIRD_OWL = exports.MANAGE_CONFLICT = exports.MANAGE_MISTAKE = exports.COMMS_INITIATE_CONSISTENCY = exports.COMMS_INITIATE_COMFORT = exports.COMMS_STYLE_PREF = exports.ADAPT_COMFORT = exports.MAJOR = exports.GENDER = void 0;
// Heterogeneous characteristic weights
exports.GENDER = 1;
exports.MAJOR = 1;
exports.ADAPT_COMFORT = 1;
exports.COMMS_STYLE_PREF = 2;
exports.COMMS_INITIATE_COMFORT = 2;
exports.COMMS_INITIATE_CONSISTENCY = 2;
exports.MANAGE_MISTAKE = 1;
exports.MANAGE_CONFLICT = 1;
// Homogeneous characteristic weights
exports.BIRD_OWL = 1;
exports.MEETING_TIME = 1;
exports.DOER_PLANNER = 2;
exports.MANAGE_DEADLINE = 2;
exports.WORK_CONSISTENCY = 1;
exports.WORK_COMMITMENT = 1;
exports.MEETING_LOCATION = 1;
exports.MEETING_CONSISTENCY = 1;
exports.COMMS_EFFECTIVE_IMPT = 1;
exports.PROJECT_PREF = 1;
exports.EXPLORE = 1;
// Weight of feedback qns cohesiveness. Cohesiveness is how well the feedback preferences of 2 people align, and thus is treated as a homogeneous characteristic (See calcSimilarity method in person.ts)
// Since this characteristic only exists in relation to 2 people, it cannot be stored in a Person object and must be recalculated each time.
// For feedback qns
exports.COHESIVENESS = 1;
// Must contain all heterogeneous characteristics to be used for fitness calculation
exports.heteroWeights = [
    exports.GENDER,
    exports.ADAPT_COMFORT,
    exports.COMMS_STYLE_PREF,
    exports.COMMS_INITIATE_COMFORT,
    exports.COMMS_INITIATE_CONSISTENCY,
    exports.MANAGE_MISTAKE,
    exports.MANAGE_CONFLICT,
];
exports.heteroWeightSum = exports.heteroWeights.reduce((sum, weight) => sum + weight, 0);
exports.HETERO_TOTAL_COUNT = exports.heteroWeights.length;
// Must contain all homogeneous characteristics to be used for fitness calculation
exports.homoWeights = [
    exports.BIRD_OWL,
    exports.MEETING_TIME,
    exports.DOER_PLANNER,
    exports.MANAGE_DEADLINE,
    exports.WORK_CONSISTENCY,
    exports.WORK_COMMITMENT,
    exports.MEETING_LOCATION,
    exports.MEETING_CONSISTENCY,
    exports.COMMS_EFFECTIVE_IMPT,
    exports.PROJECT_PREF,
    exports.EXPLORE,
];
exports.homoWeightSum = exports.homoWeights.reduce((sum, weight) => sum + weight, 0);
exports.HOMO_TOTAL_COUNT = exports.homoWeights.length;
// Weights of fHetero and fHomo, sum is 1
exports.WEIGHT_HETEROGENEOUS = 0.5;
exports.WEIGHT_HOMOGENEOUS = 1 - exports.WEIGHT_HETEROGENEOUS;
// Weights of fMix, fBal, fDist, fPref
exports.WEIGHT_MIX = 2;
exports.WEIGHT_BALANCE = 2;
exports.WEIGHT_DISTRIBUTION = 0;
exports.WEIGHT_PREFERENCE = 0;
exports.F_TOTAL_WEIGHT = exports.WEIGHT_MIX + exports.WEIGHT_BALANCE + exports.WEIGHT_DISTRIBUTION + exports.WEIGHT_PREFERENCE;
