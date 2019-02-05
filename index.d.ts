export interface InterpolationConfig {
	inputRange: Array<number>;
	outputRange: Array<any>;
	extrapolate?: "extend" | "clamp";
}

declare const interpolate: (solveFor: number, config: InterpolationConfig) => number | string;

export default interpolate;
