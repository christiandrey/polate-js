# polate-js

![](https://img.shields.io/npm/v/polate-js.svg?style=flat)
![](https://img.shields.io/david/christiandrey/polate-js.svg?style=flat)
![](https://img.shields.io/bundlephobia/minzip/polate-js.svg?style=flat)

Polate-js is a numerical and color interpolation utility for Javascript and Typescript.

## Installation

Setup via NPM

```sh
npm install polate-js --save
```

Setup via Yarn

```sh
yarn add polate-js
```

## Usage

### Numerical interpolation

```js
// import interpolate from 'polate-js';
import interpolate from "polate-js";

var valueToSolveFor = 1;

var interpolatedValue = interpolate(valueToSolveFor, {
	inputRange: [0, 2, 3],
	outputRange: [5, 7, 9],
	extrapolate: "clamp"
});

console.log(interpolatedValue); // ==> 6
```

### Color interpolation

```js
import interpolate from "polate-js";

var valueToSolveFor = 1;

var interpolatedValue = interpolate(valueToSolveFor, {
	inputRange: [0, 1],
	outputRange: ["#ff0000", "#ffffff"]
});

console.log(interpolatedValue); // ==> #ff8080
```

## InterpolationConfig

| Prop              | Description                                                                                                                                                                                                                                                            | Default  |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| **`inputRange`**  | An array of any length of numbers to be used as the input range.                                                                                                                                                                                                       |          |
| **`outputRange`** | A range of values to be mapped to the specified input range. It has to be the same length as the `inputRange` array. Provide an array of numbers to use a numerical interpolation technique, or an array of valid `HEX` or `RGB` colors to interpolate between colors. |          |
| **`extrapolate`** | What technique to use when the value to solve for is not within the input range. Can be either `clamp` or `extend`.                                                                                                                                                    | `extend` |

## License

MIT © Oluwaseun Adedire
