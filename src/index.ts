import { InterpolationConfig } from "..";
import { colorInterpolate, numericalInterpolate } from "./utils/interpolation.util";

export default function interpolate(solveFor: number, config: InterpolationConfig): number | string {
	const { inputRange, outputRange, extrapolate } = config;

	if (outputRange.every(o => typeof o === "string")) {
		return colorInterpolate(inputRange, outputRange, solveFor);
	}

	return numericalInterpolate(inputRange, outputRange, solveFor, extrapolate);
}
