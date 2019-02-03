import { linearInterpolate, lagrangeInterpolate } from "../index";

describe("linearInterpolate", () => {
	test("Should accept as input range, an array whose length is 2", () => {
		expect(() => linearInterpolate([], [5, 6], 4.5)).toThrowError("Linear interpolation only works for an input range length of 2.");
		expect(() => linearInterpolate([1], [5, 6], 4.5)).toThrowError("Linear interpolation only works for an input range length of 2.");
		expect(() => linearInterpolate([1, 2, 3], [5, 6], 4.5)).toThrowError("Linear interpolation only works for an input range length of 2.");
	});
	test("Should accept as output range, an array whose length is 2", () => {
		expect(() => linearInterpolate([1, 2], [], 4.5)).toThrowError("Linear interpolation only works for an output range length of 2.");
		expect(() => linearInterpolate([1, 2], [5], 4.5)).toThrowError("Linear interpolation only works for an output range length of 2.");
		expect(() => linearInterpolate([1, 2], [5, 6, 7], 4.5)).toThrowError("Linear interpolation only works for an output range length of 2.");
	});
	test("Should accept only numbers as input range", () => {
		expect(() => linearInterpolate([1, "2"], [4, 5], 3.5)).toThrowError("The values in the input range can only be numbers.");
	});
	test("Should accept only numbers as output range", () => {
		expect(() => linearInterpolate([1, 2], [4, "5"], 3.5)).toThrowError("The values in the output range can only be numbers.");
	});
	test("Should accept only numbers as solveFor", () => {
		expect(() => linearInterpolate([1, 3], [4, 5], "3.5")).toThrowError("The value to solve for can only be a number.");
	});
	test("Should be equal to ", () => {
		expect(linearInterpolate([2, 6], [4, 7], 4)).toBe(5.5);
		expect(linearInterpolate([3, 5], [7, 9], 4)).toBe(8);
	});
	test("Should not allow two equal values in both input range", () => {
		expect(() => linearInterpolate([1, 1], [4, 5], 3)).toThrowError("No two values in the input range can be equal.");
	});
	test("Should not allow two equal values in both output range", () => {
		expect(() => linearInterpolate([1, 2], [4, 4], 3)).toThrowError("No two values in the output range can be equal.");
	});
});

describe("lagrangeInterpolate", () => {
	test("Should allow only an equal size of input range and output range", () => {
		expect(() => lagrangeInterpolate([1, 3], [4, 5, 6], 2)).toThrowError("The input range and output range must have equal sizes.");
	});
	test("Should allow only numbers in the input range, the output range and the value to solve for", () => {
		expect(() => lagrangeInterpolate([1, 2], [4, "5"], 3.5)).toThrowError(
			"Only numbers are allowed to be values of the input range, output range and the value to solve for."
		);
		expect(() => lagrangeInterpolate([1, "2"], [4, 5], 3.5)).toThrowError(
			"Only numbers are allowed to be values of the input range, output range and the value to solve for."
		);
		expect(() => lagrangeInterpolate([1, "2"], [4, "5"], 3.5)).toThrowError(
			"Only numbers are allowed to be values of the input range, output range and the value to solve for."
		);
	});
	test("Should not allow any two equal values in the input range and the output range", () => {
		expect(() => lagrangeInterpolate([1, 1, 3], [4, 5, 6], 2)).toThrowError("No two values in the input range and output range can be equal.");
		expect(() => lagrangeInterpolate([1, 2, 3], [4, 4, 6], 2)).toThrowError("No two values in the input range and output range can be equal.");
	});
	test("Should solve to ", () => {
		expect(lagrangeInterpolate([-2, 1, 3, 7], [5, 7, 11, 34], 0)).toBeCloseTo(1087 / 180);
	});
});
