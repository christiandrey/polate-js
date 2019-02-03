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

	const increment = ((solveFor - inputRange[0]) * (outputRange[1] - outputRange[0])) / (inputRange[1] - inputRange[0]);
	return outputRange[0] + increment;
}

export function lagrangeInterpolate(inputRange: Array<number>, outputRange: Array<number>, solveFor: number): number {
	if (new Set(inputRange).size !== inputRange.length) {
		throw new Error("No two values in the input range can be equal.");
	}
	if (inputRange.length !== outputRange.length) {
		throw new Error("The input range and output range must have equal sizes.");
	}
	if (!inputRange.every(o => typeof o === "number") || !outputRange.every(o => typeof o === "number") || typeof solveFor !== "number") {
		throw new Error("Only numbers are allowed to be values of the input range, output range and the value to solve for.");
	}

	let value = 0;

	for (let i = 0; i < inputRange.length; i++) {
		const numerator = inputRange.filter((o, index) => index !== i).reduce((a, b) => a * (solveFor - b), 1);
		const denominator = inputRange.filter((o, index) => index !== i).reduce((a, b) => a * (inputRange[i] - b), 1);
		const increment = (numerator / denominator) * outputRange[i];
		value = value + increment;
	}

	return value;
}

export function colorInterpolate(inputRange: Array<number>, outputRange: Array<string>, solveFor): string {
	if (inputRange.length !== outputRange.length) {
		throw new Error("The input range and output range must have equal sizes.");
	}
	if (new Set(inputRange).size !== inputRange.length || new Set(outputRange).size !== outputRange.length) {
		throw new Error("No two values in the input range and output range can be equal.");
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

	const normalizedValues = outputRange.map(o => normalizeColor(o));
	const interpolatedValues = new Array<number>();
	const useLinearInterpolation = inputRange.length === 2;

	for (let i = 0; i < 3; i++) {
		const outputRange = normalizedValues.map(o => o[i]);
		useLinearInterpolation
			? interpolatedValues.push(Math.round(linearInterpolate(inputRange, outputRange, solveFor)))
			: interpolatedValues.push(Math.round(lagrangeInterpolate(inputRange, outputRange, solveFor)));
	}

	return "#" + interpolatedValues.map(o => convertDecimalToHexadecimal(o)).join("");
}

function validateColor(color: string): boolean {
	const sanitizedColor = sanitizeColor(color);

	if (validateHexadecimalColor(sanitizedColor)) {
		return true;
	}

	if (validateRgbColor(sanitizedColor)) {
		return true;
	}

	return false;
}

function normalizeColor(color: string): Array<number> {
	let sanitizedColor = sanitizeColor(color);

	if (validateHexadecimalColor(sanitizedColor)) {
		sanitizedColor = sanitizedColor.replace("#", "");
		if (sanitizedColor.length === 3) {
			sanitizedColor = sanitizedColor
				.split("")
				.map(o => o + o)
				.join("");
		}

		const normalizedColor = new Array<number>();
		for (let i = 0; i < 6; i += 2) {
			normalizedColor.push(convertHexadecimalToDecimal(`${sanitizedColor.charAt(i)}${sanitizedColor.charAt(i + 1)}`));
		}

		return normalizedColor;
	}

	return sanitizedColor
		.match(/\((.*?)\)/)[1]
		.split(",")
		.map(o => parseInt(o));
}

function sanitizeColor(color: string): string {
	return color.toLowerCase().replace(/\s\s+/, "");
}

function validateHexadecimalColor(color: string): boolean {
	const hexTestRegex = /^#([a-f0-9]{3}|[a-f0-9]{6})$/;
	return hexTestRegex.test(color);
}

function validateRgbColor(color: string): boolean {
	const rgbTestRegex = /^rgb\(([0-2]?[0-9]{0,2},?){2}[0-2]?[0-9]{0,2}\)$/;
	return rgbTestRegex.test(color);
}

function convertDecimalToHexadecimal(decimal: number): string {
	const hexTable = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
	return `${hexTable[Math.floor(decimal / 16)]}${hexTable[decimal % 16]}`;
}

function convertHexadecimalToDecimal(hexadecimal: string): number {
	const hexTable = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
	return hexTable.indexOf(hexadecimal.charAt(0)) * 16 + hexTable.indexOf(hexadecimal.charAt(1));
}
