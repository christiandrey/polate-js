export interface InterpolationConfig {
	inputRange: Array<number>;
	outputRange: Array<any>;
	extrapolate?: "extend" | "clamp";
}
