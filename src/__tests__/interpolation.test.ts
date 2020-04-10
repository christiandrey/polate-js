import { linearInterpolate, colorInterpolate } from "../utils/interpolation.util";

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
	test("Should not allow Infinity and -Infinity as values in the input range and output range", () => {
		expect(() => linearInterpolate([1, Infinity], [4, 5], 3.5)).toThrowError(
			"The values in the input range and output range and the value to solve for cannot include Infinity or -Infinity."
		);
		expect(() => linearInterpolate([1, -Infinity], [4, 5], 3.5)).toThrowError(
			"The values in the input range and output range and the value to solve for cannot include Infinity or -Infinity."
		);
		expect(() => linearInterpolate([1, 2], [Infinity, 5], 3.5)).toThrowError(
			"The values in the input range and output range and the value to solve for cannot include Infinity or -Infinity."
		);
		expect(() => linearInterpolate([1, 2], [-Infinity, 5], 3.5)).toThrowError(
			"The values in the input range and output range and the value to solve for cannot include Infinity or -Infinity."
		);
		expect(() => linearInterpolate([1, 2], [4, 5], Infinity)).toThrowError(
			"The values in the input range and output range and the value to solve for cannot include Infinity or -Infinity."
		);
		expect(() => linearInterpolate([1, 2], [4, 5], -Infinity)).toThrowError(
			"The values in the input range and output range and the value to solve for cannot include Infinity or -Infinity."
		);
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
	test("Should only allow values that are strictly monotonically increasing in the input range", () => {
		expect(() => linearInterpolate([1, 0], [4, 5], 3)).toThrowError("Values in the input range have to be strictly monotonically increasing.");
		expect(() => linearInterpolate([1, 1], [4, 5], 3)).toThrowError("Values in the input range have to be strictly monotonically increasing.");
	});
	test("Should extend values that are greater than input range's maximum value", () => {
		expect(linearInterpolate([5, 10], [50, 100], 11, "extend")).toBe(110)
	});
	test("Should clamp values that are greater than input range's maximum value", () => {
		expect(linearInterpolate([5, 10], [50, 100], 11, "clamp")).toBe(100)
	});
	test("Should extend values that are lower than input range's minimum value", () => {
		expect(linearInterpolate([5, 10], [50, 100], 4, "extend")).toBe(40)
	});
	test("Should clamp values that are lower than input range's minimum value", () => {
		expect(linearInterpolate([5, 10], [50, 100], 4, "clamp")).toBe(50)
	});
});

describe("colorInterpolate", () => {
	test("Should allow only an equal size of input range and output range", () => {
		expect(() => colorInterpolate([1, 3], ["#ff0000", "#ff00ff", "#ffff00"], 2)).toThrowError("The input range and output range must have equal sizes.");
	});
	test("Should accept only numbers as input range", () => {
		expect(() => colorInterpolate([1, "2"], ["#ff0000", "#ff00ff"], 1.5)).toThrowError("The values in the input range can only be numbers.");
	});
	test("Should accept only strings as output range", () => {
		expect(() => colorInterpolate([1, 2], [1, "#ff00ff"], 1.5)).toThrowError("The values in the output range can only be strings.");
	});
	test("Should accept only strings that are valid colors in the output range", () => {
		expect(() => colorInterpolate([1, 2], ["#ff0000", "#ff00gh"], 1.5)).toThrowError("The values in the output range have to be valid hex or rgb colors.");
		expect(() => colorInterpolate([1, 2], ["#ff0000", "#bag"], 1.5)).toThrowError("The values in the output range have to be valid hex or rgb colors.");
		expect(() => colorInterpolate([1, 2], ["#ff0000", "invalid value"], 1.5)).toThrowError("The values in the output range have to be valid hex or rgb colors.");
		expect(() => colorInterpolate([1, 2], ["#ff0000", "rgba(255,255,255,0.2)"], 1.5)).toThrowError("The values in the output range have to be valid hex or rgb colors.");
		expect(() => colorInterpolate([1, 2], ["#ff0000", "rgb(255,255,500)"], 1.5)).toThrowError("The values in the output range have to be valid hex or rgb colors.");
	});
	test("Should only allow values that are strictly monotonically increasing in the input range", () => {
		expect(() => colorInterpolate([1, 1, 3], ["#ff0000", "#ff00ff", "#ffff00"], 2)).toThrowError(
			"Values in the input range have to be strictly monotonically increasing."
		);
		expect(() => colorInterpolate([1, 2, 0], ["#ff0000", "#ff0000", "#ffff00"], 2)).toThrowError(
			"Values in the input range have to be strictly monotonically increasing."
		);
		expect(() => colorInterpolate([1, 2, 2], ["#ff0000", "#ff0000", "#ffff00"], 2)).toThrowError(
			"Values in the input range have to be strictly monotonically increasing."
		);
	});
	test("Should solve to", () => {
		expect(colorInterpolate([0, 1], ["#ff0000", "#ffffff"], 0.5)).toBe("#ff8080");
	});
});
