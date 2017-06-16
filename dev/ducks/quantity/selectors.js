import {
	createSelector
}
from 'reselect'
import {
	linspace, dopri, at
}
from 'numeric'

//define dependent variables --should be pure functions

function x(t) { //could depend on numeric spline
	return 0//4 * Math.cos(t)
}

function dl(x, y) {
	return y - x
}

function fs(dl, k) {
	return -dl * k
}

function s(t) {
	return 0
}

function y(sol, t) {
	return t
}

//define scales
function transform(value, scale) {
	var range = scale.max - scale.min;
	var tRange = scale.tMax - scale.tMin;
	return (value - scale.min) / range * tRange + scale.tMin;
};


//define value accessors
export const getQuantityData = function (state, name) {
	if (name === undefined) {
		throw 'Selector Error: name is undefined'
	}
	try {
		return state.quantities[name]
	} catch (e) {
		throw 'quantitiy ' + name + ' not found'
	}
}

export const getMin = (state, name) => (getQuantityData(state, name).min)

export const getMax = (state, name) => (getQuantityData(state, name).max)

export const getSymbol = (state, name) => (getQuantityData(state, name).symbol)

export const getAnimatable = (state, name) => (getQuantityData(state, name).hasOwnProperty('animation'))

export const getPlaying = (state, name) => {
	var animatable = getAnimatable(state, name)

	if (animatable) {
		return getQuantityData(state, name).animation.playing
	} else {
		return false
	}
}

export const getScale = (state, quantity, min, max) => ({
	min: getMin(state, quantity),
	max: getMax(state, quantity),
	tMin: min,
	tMax: max
})

export const getCoordSys = (state, xVar, yVar, parentBB) => ({
	xScale: {
		min: getMin(state, xVar),
		max: getMax(state, xVar),
		tMin: parentBB.xMin,
		tMax: parentBB.xMax
	},
	yScale: {
		min: getMin(state, yVar),
		max: getMax(state, yVar),
		tMin: parentBB.yMin,
		tMax: parentBB.yMax
	}

})

export const getValue = function (state, name, given) {
	var given = given || {}
		//given is an object of independent variables that replace concrete values
	var quantityData = getQuantityData(state, name)
	if (quantityData.independent) {
		return (given[name] === undefined) ? quantityData.value : given[name]
	}
	switch (name) {
	case "x":
		var t = (given.t === undefined) ? getValue(state, 't') : given.t
		return x(t)
		break;
	case 's':
		var t = (given.t === undefined) ? getValue(state, 't') : given.t
		return s(t)
		break;
	case "y":
		var t = (given.t === undefined) ? getValue(state, 't') : given.t
		var sol = getSol(state)
		var y = sol.at(t)[0]
		return y
		break;
	case "dl":
		let xVal = getValue(state, 'x')
		let yVal = getValue(state, 'y')
		return dl(xVal, yVal)
		break;
	case "fs":
		let dlVal = getValue(state, 'dl')
		let k = getValue(state, 'k')

		return fs(dlVal, k)
		break;
	default:
		throw "make sure that " + name + " is labeled as independent"
	}
}

export const getTransformedValue = function (state, name, scale, given) { //change to scale?
	var quantityData = getQuantityData(state, name)
	var value = getValue(state, name, given)
	var transformedValue = transform(value, scale)
	return transformedValue
}

function getValueff(name) {
	return (state) => getValue(state, name)
}

function getMinff(name) {
	return (state) => getMin(state, name)
}

function getMaxff(name) {
	return (state) => getMax(state, name)
}

const getSol = createSelector(
	[
		getValueff('k'),
		getValueff('m'),
		getValueff('c'),
		getValueff('y0'),
		getValueff('dy0'),
		getMinff('t'),
		getMaxff('t')
	],
	getSolNoMem
)

function getSolNoMem(k, m, c, y0, dy0, min, max) {
	//right now only works for y(t) and y'(t)
	var f = function (t, y) {
		return [
			y[1],
			-k / m * (y[0] - x(t)) - c / m * y[1]
		];
	};
	var sol = dopri(min, max, [y0, dy0], f, 1e-6, 2000);
	return sol
}

export const getAbsValues = function (state, name, absName) {
	//abstract name w.r.t. absName
	var absData = getQuantityData(state, absName)
	var absPoints = linspace(absData.min, absData.max, absData.abstractions)
	var values = absPoints.map(function (val) {
		return getValue(state, name, {
			[absName]: val
		})
	})

	return values
}

export const getAbsPoints = function (state, indVar, xVar, yVar) {
	var xPoints = getAbsValues(state, xVar, indVar)
	var yPoints = getAbsValues(state, yVar, indVar)
	var points = xPoints.map(function (xVal, i) {
		return {
			x: xVal,
			y: yPoints[i]
		}
	})
	return points
}

export const getSecondaryAbsPoints = function (state, name, absName) {

}
