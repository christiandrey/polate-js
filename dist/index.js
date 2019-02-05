import { colorInterpolate, numericalInterpolate } from "./utils/interpolation.util";
export default function interpolate(solveFor, config) {
    var inputRange = config.inputRange, outputRange = config.outputRange, extrapolate = config.extrapolate;
    if (outputRange.every(function (o) { return typeof o === "string"; })) {
        return colorInterpolate(inputRange, outputRange, solveFor);
    }
    return numericalInterpolate(inputRange, outputRange, solveFor, extrapolate);
}
