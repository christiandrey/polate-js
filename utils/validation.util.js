"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
function checkStrictlyIncreasingValidity(inputRange) {
    var validity = true;
    for (var i = 0; i <= inputRange.length - 2; i++) {
        if (inputRange[i + 1] <= inputRange[i]) {
            validity = false;
            break;
        }
    }
    return validity;
}
exports.checkStrictlyIncreasingValidity = checkStrictlyIncreasingValidity;
function checkNoInfinityValidity(solveFor, inputRange, outputRange) {
    if (outputRange === void 0) { outputRange = []; }
    return !tslib_1.__spreadArrays(inputRange, outputRange, [solveFor]).some(function (o) { return o === Infinity || o === -Infinity; });
}
exports.checkNoInfinityValidity = checkNoInfinityValidity;
