"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var colors_util_1 = require("./colors.util");
var validation_util_1 = require("./validation.util");
function findInterpolationRangeStart(inputRange, solveFor) {
    var rangeEnd;
    for (var i = 0; i < inputRange.length; i++) {
        if (inputRange[i] >= solveFor) {
            rangeEnd = i;
            break;
        }
    }
    return rangeEnd === undefined ? inputRange.length - 2 : Math.max(0, rangeEnd - 1);
}
exports.findInterpolationRangeStart = findInterpolationRangeStart;
function linearInterpolate(inputRange, outputRange, solveFor, extrapolate) {
    if (extrapolate === void 0) { extrapolate = "extend"; }
    if (inputRange.length !== 2) {
        throw new Error("Linear interpolation only works for an input range length of 2.");
    }
    if (outputRange.length !== 2) {
        throw new Error("Linear interpolation only works for an output range length of 2.");
    }
    if (!inputRange.every(function (o) { return typeof o === "number"; })) {
        throw new Error("The values in the input range can only be numbers.");
    }
    if (!outputRange.every(function (o) { return typeof o === "number"; })) {
        throw new Error("The values in the output range can only be numbers.");
    }
    if (typeof solveFor !== "number") {
        throw new Error("The value to solve for can only be a number.");
    }
    if (!validation_util_1.checkNoInfinityValidity(solveFor, inputRange, outputRange)) {
        throw new Error("The values in the input range and output range and the value to solve for cannot include Infinity or -Infinity.");
    }
    if (!validation_util_1.checkStrictlyIncreasingValidity(inputRange)) {
        throw new Error("Values in the input range have to be strictly monotonically increasing.");
    }
    var inputMin = inputRange[0];
    var inputMax = inputRange[inputRange.length - 1];
    var outputMin = outputRange[0];
    var outputMax = outputRange[outputRange.length - 1];
    if (solveFor <= inputMin && extrapolate === "clamp") {
        return outputMin;
    }
    if (solveFor >= inputMax && extrapolate === "clamp") {
        return outputMax;
    }
    var increment = ((solveFor - inputRange[0]) * (outputRange[1] - outputRange[0])) / (inputRange[1] - inputRange[0]);
    return outputRange[0] + increment;
}
exports.linearInterpolate = linearInterpolate;
function numericalInterpolate(inputRange, outputRange, solveFor, extrapolate) {
    if (extrapolate === void 0) { extrapolate = "extend"; }
    if (inputRange.length !== outputRange.length) {
        throw new Error("The input range and output range must have equal sizes.");
    }
    if (!inputRange.every(function (o) { return typeof o === "number"; })) {
        throw new Error("The values in the input range can only be numbers.");
    }
    if (!outputRange.every(function (o) { return typeof o === "number"; })) {
        throw new Error("The values in the output range can only be numbers.");
    }
    if (!validation_util_1.checkNoInfinityValidity(solveFor, inputRange)) {
        throw new Error("The values in the input range and the value to solve for cannot include Infinity or -Infinity.");
    }
    if (!validation_util_1.checkStrictlyIncreasingValidity(inputRange)) {
        throw new Error("Values in the input range have to be strictly monotonically increasing.");
    }
    var interpolationRangeStart = findInterpolationRangeStart(inputRange, solveFor);
    return linearInterpolate([inputRange[interpolationRangeStart], inputRange[interpolationRangeStart + 1]], [outputRange[interpolationRangeStart], outputRange[interpolationRangeStart + 1]], solveFor, extrapolate);
}
exports.numericalInterpolate = numericalInterpolate;
function colorInterpolate(inputRange, outputRange, solveFor, extrapolate) {
    if (extrapolate === void 0) { extrapolate = "extend"; }
    if (inputRange.length !== outputRange.length) {
        throw new Error("The input range and output range must have equal sizes.");
    }
    if (!inputRange.every(function (o) { return typeof o === "number"; })) {
        throw new Error("The values in the input range can only be numbers.");
    }
    if (!outputRange.every(function (o) { return typeof o === "string"; })) {
        throw new Error("The values in the output range can only be strings.");
    }
    if (!outputRange.every(function (o) { return colors_util_1.validateColor(o); })) {
        throw new Error("The values in the output range have to be valid hex or rgb colors.");
    }
    if (!validation_util_1.checkNoInfinityValidity(solveFor, inputRange)) {
        throw new Error("The values in the input range and the value to solve for cannot include Infinity or -Infinity.");
    }
    if (!validation_util_1.checkStrictlyIncreasingValidity(inputRange)) {
        throw new Error("Values in the input range have to be strictly monotonically increasing.");
    }
    var inputMin = inputRange[0];
    var inputMax = inputRange[inputRange.length - 1];
    var outputMin = outputRange[0];
    var outputMax = outputRange[outputRange.length - 1];
    if (solveFor <= inputMin && extrapolate === "clamp") {
        return outputMin;
    }
    if (solveFor >= inputMax && extrapolate === "clamp") {
        return outputMax;
    }
    var normalizedValues = outputRange.map(function (o) { return colors_util_1.normalizeColor(o); });
    var interpolationRangeStart = findInterpolationRangeStart(inputRange, solveFor);
    var interpolatedValues = new Array();
    var _loop_1 = function (i) {
        var outputRange_1 = normalizedValues.map(function (o) { return o[i]; });
        interpolatedValues.push(Math.round(linearInterpolate([inputRange[interpolationRangeStart], inputRange[interpolationRangeStart + 1]], [outputRange_1[interpolationRangeStart], outputRange_1[interpolationRangeStart + 1]], solveFor, extrapolate)));
    };
    for (var i = 0; i < 3; i++) {
        _loop_1(i);
    }
    return "#" + colors_util_1.convertRgbToHexadecimal(interpolatedValues[0], interpolatedValues[1], interpolatedValues[2]);
}
exports.colorInterpolate = colorInterpolate;
