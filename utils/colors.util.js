"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function normalizeColor(color) {
    var sanitizedColor = sanitizeColor(color);
    if (validateHexadecimalColor(sanitizedColor)) {
        sanitizedColor = sanitizedColor.replace("#", "");
        if (sanitizedColor.length === 3) {
            sanitizedColor = sanitizedColor
                .split("")
                .map(function (o) { return o + o; })
                .join("");
        }
        return convertHexadecimalToRgb(sanitizedColor);
    }
    return sanitizedColor
        .match(/\((.*?)\)/)[1]
        .split(",")
        .map(function (o) { return parseInt(o); });
}
exports.normalizeColor = normalizeColor;
function sanitizeColor(color) {
    return color.toLowerCase().replace(/\s\s+/, "");
}
exports.sanitizeColor = sanitizeColor;
function validateHexadecimalColor(color) {
    var hexTestRegex = /^#([a-f0-9]{3}|[a-f0-9]{6})$/;
    return hexTestRegex.test(color);
}
exports.validateHexadecimalColor = validateHexadecimalColor;
function validateRgbColor(color) {
    var rgbTestRegex = /^rgb\(([0-2]?[0-9]{0,2},?){2}[0-2]?[0-9]{0,2}\)$/;
    return rgbTestRegex.test(color);
}
exports.validateRgbColor = validateRgbColor;
function validateColor(color) {
    var sanitizedColor = sanitizeColor(color);
    if (validateHexadecimalColor(sanitizedColor)) {
        return true;
    }
    if (validateRgbColor(sanitizedColor)) {
        return true;
    }
    return false;
}
exports.validateColor = validateColor;
function convertRgbToHexadecimal(red, green, blue) {
    return ((1 << 24) + (red << 16) + (green << 8) + blue).toString(16).slice(1);
}
exports.convertRgbToHexadecimal = convertRgbToHexadecimal;
function convertHexadecimalToRgb(hexadecimal) {
    var parsedInt = parseInt(hexadecimal, 16);
    var red = (parsedInt >> 16) & 255;
    var green = (parsedInt >> 8) & 255;
    var blue = parsedInt & 255;
    return [red, green, blue];
}
exports.convertHexadecimalToRgb = convertHexadecimalToRgb;
