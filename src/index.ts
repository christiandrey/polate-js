export function linearInterpolate(inputRange: Array<number>, outputRange: Array<number>, solveFor: number): number {
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
	if (new Set(inputRange).size !== 2) {
		throw new Error("No two values in the input range can be equal.");
	}
	if (new Set(outputRange).size !== 2) {
		throw new Error("No two values in the output range can be equal.");
	}

	const increment = ((solveFor - inputRange[0]) * (outputRange[1] - outputRange[0])) / (inputRange[1] - inputRange[0]);
	return outputRange[0] + increment;
}

export function lagrangeInterpolate(inputRange: Array<number>, outputRange: Array<number>, solveFor: number): number {
	if (new Set(inputRange).size !== inputRange.length || new Set(outputRange).size !== outputRange.length) {
		throw new Error("No two values in the input range and output range can be equal.");
	}
	if (inputRange.length !== outputRange.length) {
		throw new Error("The input range and output range must have equal sizes.");
	}
	if (!inputRange.every(o => typeof o === "number") || !outputRange.every(o => typeof o === "number") || typeof solveFor !== "number") {
		throw new Error("Only numbers are allowed to be values of the input range, output range and the value to solve for.");
	}

	let value = 0;

	for (let i = 0; i < inputRange.length; i++) {
		const top = inputRange.filter((o, index) => index !== i).reduce((a, b) => a * (solveFor - b), 1);
		const bottom = inputRange.filter((o, index) => index !== i).reduce((a, b) => a * (inputRange[i] - b), 1);
		const increment = (top / bottom) * outputRange[i];
		value = value + increment;
	}

	return value;
}
