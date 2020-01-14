export function checkStrictlyIncreasingValidity(inputRange: Array<number>): boolean {
	let validity = true;
	for (let i = 0; i <= inputRange.length - 2; i++) {
		if (inputRange[i + 1] <= inputRange[i]) {
			validity = false;
			break;
		}
	}
	return validity;
}

export function checkNoInfinityValidity(solveFor: number, inputRange: Array<number>, outputRange: Array<number> = []): boolean {
	return !inputRange
		.concat(outputRange)
		.concat([solveFor])
		.some(o => o === Infinity || o === -Infinity);
}
