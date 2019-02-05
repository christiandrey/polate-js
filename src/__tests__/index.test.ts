import interpolate from "..";

describe("interpolate", () => {
	test("should solve to", () => {
		expect(interpolate(0.5, { inputRange: [0, 1], outputRange: [6, 8] })).toBeCloseTo(7);
		expect(interpolate(0.5, { inputRange: [0, 1], outputRange: ["#ff0000", "#ffffff"] })).toBe("#ff8080");
	});
});
