export function normalizeColor(color: string): Array<number> {
	let sanitizedColor = sanitizeColor(color);

	if (validateHexadecimalColor(sanitizedColor)) {
		sanitizedColor = sanitizedColor.replace("#", "");
		if (sanitizedColor.length === 3) {
			sanitizedColor = sanitizedColor
				.split("")
				.map(o => o + o)
				.join("");
		}
		return convertHexadecimalToRgb(sanitizedColor);
	}

	return sanitizedColor
		.match(/\((.*?)\)/)[1]
		.split(",")
		.map(o => parseInt(o));
}

export function sanitizeColor(color: string): string {
	return color.toLowerCase().replace(/\s\s+/, "");
}

export function validateHexadecimalColor(color: string): boolean {
	const hexTestRegex = /^#([a-f0-9]{3}|[a-f0-9]{6})$/;
	return hexTestRegex.test(color);
}

export function validateRgbColor(color: string): boolean {
	const rgbTestRegex = /^rgb\(([0-2]?[0-9]{0,2},?){2}[0-2]?[0-9]{0,2}\)$/;
	return rgbTestRegex.test(color);
}

export function validateColor(color: string): boolean {
	const sanitizedColor = sanitizeColor(color);
	if (validateHexadecimalColor(sanitizedColor)) {
		return true;
	}
	if (validateRgbColor(sanitizedColor)) {
		return true;
	}
	return false;
}

export function convertRgbToHexadecimal(red: number, green: number, blue: number): string {
	return ((1 << 24) + (red << 16) + (green << 8) + blue).toString(16).slice(1);
}

export function convertHexadecimalToRgb(hexadecimal: string): Array<number> {
	const parsedInt = parseInt(hexadecimal, 16);
	const red = (parsedInt >> 16) & 255;
	const green = (parsedInt >> 8) & 255;
	const blue = parsedInt & 255;
	return [red, green, blue];
}
