"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var interpolation_util_1 = require("./utils/interpolation.util");
function interpolate(solveFor, config) {
    var inputRange = config.inputRange, outputRange = config.outputRange, extrapolate = config.extrapolate;
    if (outputRange.every(function (o) { return typeof o === "string"; })) {
        return interpolation_util_1.colorInterpolate(inputRange, outputRange, solveFor);
    }
    return interpolation_util_1.numericalInterpolate(inputRange, outputRange, solveFor, extrapolate);
}
exports.default = interpolate;
