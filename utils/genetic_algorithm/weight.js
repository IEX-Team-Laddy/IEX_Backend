"use strict";
// Weight.ts
// Psuedo class reference => constants here can be used using `import * as Weight from './Weight';`
Object.defineProperty(exports, "__esModule", { value: true });
exports.F_TOTAL_WEIGHT = exports.WEIGHT_PREFERENCE = exports.WEIGHT_DISTRIBUTION = exports.WEIGHT_BALANCE = exports.WEIGHT_MIX = exports.WEIGHT_HOMOGENEOUS = exports.WEIGHT_HETEROGENEOUS = exports.HOMO_TOTAL_COUNT = exports.homoWeightSum = exports.homoWeights = exports.HETERO_TOTAL_COUNT = exports.heteroWeightSum = exports.heteroWeights = exports.COHESIVENESS = exports.FITNESS_PENALTY = exports.HANGOUT_ACT_PREF = exports.IDEAL_GROUP_SIZE = exports.HANDLE_STRESS = exports.EXPLORE_COMFORT = exports.CHALLENGE_PREF = exports.EFFECTIVE_COMMS = exports.MEETING_FREQUENCY = exports.MEETING_STYLE = exports.WORK_CONSISTENCY = exports.MANAGE_DEADLINE = exports.WORK_APPROACH = exports.MEETING_HOUR = exports.WORK_HOUR = exports.START_COLLAB = exports.HANDLE_CONFLICT = exports.HANDLE_MISTAKE = exports.INITIATING_FREQUENCY = exports.INITIATING_CONVO = exports.ADAPTING_COMFORT = exports.GENDER = void 0;
// Heterogeneous characteristic weights
exports.GENDER = 1;
exports.ADAPTING_COMFORT = 1;
exports.INITIATING_CONVO = 3;
exports.INITIATING_FREQUENCY = 3;
exports.HANDLE_MISTAKE = 1;
exports.HANDLE_CONFLICT = 1;
// Homogeneous characteristic weights
exports.START_COLLAB = 1;
exports.WORK_HOUR = 1;
exports.MEETING_HOUR = 1;
exports.WORK_APPROACH = 3;
exports.MANAGE_DEADLINE = 3;
exports.WORK_CONSISTENCY = 1;
exports.MEETING_STYLE = 1;
exports.MEETING_FREQUENCY = 1;
exports.EFFECTIVE_COMMS = 1;
exports.CHALLENGE_PREF = 1;
exports.EXPLORE_COMFORT = 1;
exports.HANDLE_STRESS = 1;
exports.IDEAL_GROUP_SIZE = 1;
exports.HANGOUT_ACT_PREF = 1;
// PENALTY
exports.FITNESS_PENALTY = 1000;
// Weight of feedback qns cohesiveness. Cohesiveness is how well the feedback preferences of 2 people align, and thus is treated as a homogeneous characteristic (See calcSimilarity method in person.ts)
// Since this characteristic only exists in relation to 2 people, it cannot be stored in a Person object and must be recalculated each time.
// For feedback qns
exports.COHESIVENESS = 1;
// Must contain all heterogeneous characteristics to be used for fitness calculation
exports.heteroWeights = [
    exports.GENDER,
    exports.ADAPTING_COMFORT,
    exports.INITIATING_CONVO,
    exports.INITIATING_FREQUENCY,
    exports.HANDLE_MISTAKE,
    exports.HANDLE_CONFLICT
];
exports.heteroWeightSum = exports.heteroWeights.reduce((sum, weight) => sum + weight, 0);
exports.HETERO_TOTAL_COUNT = exports.heteroWeights.length;
// Must contain all homogeneous characteristics to be used for fitness calculation
exports.homoWeights = [
    exports.START_COLLAB,
    exports.WORK_HOUR,
    exports.MEETING_HOUR,
    exports.WORK_APPROACH,
    exports.MANAGE_DEADLINE,
    exports.WORK_CONSISTENCY,
    exports.MEETING_STYLE,
    exports.MEETING_FREQUENCY,
    exports.EFFECTIVE_COMMS,
    exports.CHALLENGE_PREF,
    exports.EXPLORE_COMFORT,
    exports.HANDLE_STRESS,
    exports.IDEAL_GROUP_SIZE,
    exports.HANGOUT_ACT_PREF
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
