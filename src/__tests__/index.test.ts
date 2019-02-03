import { linearInterpolate } from "../index";

describe("linearInterpolate", () => {
	test("Should accept as input range, an array whose length is 2", () => {
		expect(linearInterpolate([1, 2, 3], [5, 6], 4.5)).toBeNull();
	});
	test("Should accept as output range, an array whose length is 2", () => {
		expect(linearInterpolate([1, 2], [5, 6, 7], 4.5)).toBeNull();
	});
	test("Should accept only numbers as input range", () => {
		expect(linearInterpolate([1, "2"], [4, 5], 3.5)).toBeNull();
	});
	test("Should accept only numbers as output range", () => {
		expect(linearInterpolate([1, 2], [4, "5"], 3.5)).toBeNull();
	});
	test("Should accept only numbers as solveFor", () => {
		expect(linearInterpolate([1, 3], [4, 5], "3.5")).toBeNull();
	});
	test("Should be equal to ", () => {
		expect(linearInterpolate([2, 4], [6, 7], 4)).toBe(5.5);
		expect(linearInterpolate([3, 5], [7, 9], 4)).toBe(8);
	});
	test("Should not allow two equal values in both input range", () => {
		expect(linearInterpolate([1, 1], [4, 5], 3)).toBeNull();
	});
	test("Should not allow two equal values in both output range", () => {
		expect(linearInterpolate([1, 2], [4, 2], 3)).toBeNull();
	});
});
