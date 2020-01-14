import { convertRgbToHexadecimal, normalizeColor, validateColor } from './colors.util';
import { checkNoInfinityValidity, checkStrictlyIncreasingValidity } from './validation.util';

export function findInterpolationRangeStart(inputRange: Array<number>, solveFor: number): number {
	let rangeEnd: number;
	for (let i = 0; i < inputRange.length; i++) {
		if (inputRange[i] >= solveFor) {
			rangeEnd = i;
			break;
		}
	}
	return rangeEnd - 1;
}

export function linearInterpolate(inputRange: Array<number>, outputRange: Array<number>, solveFor: number, extrapolate: "clamp" | "extend" = "extend"): number {
	if (inputRange.length !== 2) {
		throw new Error("Linear interpolation only works for an input range length of 2.");
	}
	if (outputRange.length !== 2) {
		throw new Error("Linear interpolation only works for an output range length of 2.");
	}
	if (!inputRange.every(o => typeof o === "number")) {
		throw new Error("The values in the input range can only be numbers.");
	}
	if (!outputRange.every(o => typeof o === "number")) {
		throw new Error("The values in the output range can only be numbers.");
	}
	if (typeof solveFor !== "number") {
		throw new Error("The value to solve for can only be a number.");
	}
	if (!checkNoInfinityValidity(solveFor, inputRange, outputRange)) {
		throw new Error("The values in the input range and output range and the value to solve for cannot include Infinity or -Infinity.");
	}
	if (!checkStrictlyIncreasingValidity(inputRange)) {
		throw new Error("Values in the input range have to be strictly monotonically increasing.");
	}

	const inputMin = inputRange[0];
	const inputMax = inputRange[inputRange.length - 1];
	const outputMin = outputRange[0];
	const outputMax = outputRange[outputRange.length - 1];

	if (solveFor <= inputMin && extrapolate === "clamp") {
		return outputMin;
	}
	if (solveFor >= inputMax && extrapolate === "clamp") {
		return outputMax;
	}

	const increment = ((solveFor - inputRange[0]) * (outputRange[1] - outputRange[0])) / (inputRange[1] - inputRange[0]);
	return outputRange[0] + increment;
}

export function numericalInterpolate(inputRange: Array<number>, outputRange: Array<number>, solveFor: number, extrapolate: "clamp" | "extend" = "extend"): number {
	if (inputRange.length !== outputRange.length) {
		throw new Error("The input range and output range must have equal sizes.");
	}
	if (!inputRange.every(o => typeof o === "number")) {
		throw new Error("The values in the input range can only be numbers.");
	}
	if (!outputRange.every(o => typeof o === "number")) {
		throw new Error("The values in the output range can only be numbers.");
	}
	if (!checkNoInfinityValidity(solveFor, inputRange)) {
		throw new Error("The values in the input range and the value to solve for cannot include Infinity or -Infinity.");
	}
	if (!checkStrictlyIncreasingValidity(inputRange)) {
		throw new Error("Values in the input range have to be strictly monotonically increasing.");
	}

	const interpolationRangeStart = findInterpolationRangeStart(inputRange, solveFor);
	return linearInterpolate(
		[inputRange[interpolationRangeStart], inputRange[interpolationRangeStart + 1]],
		[outputRange[interpolationRangeStart], outputRange[interpolationRangeStart + 1]],
		solveFor,
		extrapolate
	);
}

export function colorInterpolate(inputRange: Array<number>, outputRange: Array<string>, solveFor: number, extrapolate: "clamp" | "extend" = "extend"): string {
	if (inputRange.length !== outputRange.length) {
		throw new Error("The input range and output range must have equal sizes.");
	}
	if (!inputRange.every(o => typeof o === "number")) {
		throw new Error("The values in the input range can only be numbers.");
	}
	if (!outputRange.every(o => typeof o === "string")) {
		throw new Error("The values in the output range can only be strings.");
	}
	if (!outputRange.every(o => validateColor(o))) {
		throw new Error("The values in the output range have to be valid hex or rgb colors.");
	}
	if (!checkNoInfinityValidity(solveFor, inputRange)) {
		throw new Error("The values in the input range and the value to solve for cannot include Infinity or -Infinity.");
	}
	if (!checkStrictlyIncreasingValidity(inputRange)) {
		throw new Error("Values in the input range have to be strictly monotonically increasing.");
	}

	const inputMin = inputRange[0];
	const inputMax = inputRange[inputRange.length - 1];
	const outputMin = outputRange[0];
	const outputMax = outputRange[outputRange.length - 1];

	if (solveFor <= inputMin && extrapolate === "clamp") {
		return outputMin;
	}
	if (solveFor >= inputMax && extrapolate === "clamp") {
		return outputMax;
	}

	const normalizedValues = outputRange.map(o => normalizeColor(o));
	const interpolationRangeStart = findInterpolationRangeStart(inputRange, solveFor);
	const interpolatedValues = new Array<number>();

	for (let i = 0; i < 3; i++) {
		const outputRange = normalizedValues.map(o => o[i]);
		interpolatedValues.push(
			Math.round(
				linearInterpolate(
					[inputRange[interpolationRangeStart], inputRange[interpolationRangeStart + 1]],
					[outputRange[interpolationRangeStart], outputRange[interpolationRangeStart + 1]],
					solveFor,
					extrapolate
				)
			)
		);
	}

	return "#" + convertRgbToHexadecimal(interpolatedValues[0], interpolatedValues[1], interpolatedValues[2]);
}
