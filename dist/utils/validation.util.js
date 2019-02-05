export function checkStrictlyIncreasingValidity(inputRange) {
    var validity = true;
    for (var i = 0; i <= inputRange.length - 2; i++) {
        if (inputRange[i + 1] <= inputRange[i]) {
            validity = false;
            break;
        }
    }
    return validity;
}
export function checkNoInfinityValidity(solveFor, inputRange, outputRange) {
    if (outputRange === void 0) { outputRange = []; }
    return !inputRange.concat(outputRange, [solveFor]).some(function (o) { return o === Infinity || o === -Infinity; });
}
