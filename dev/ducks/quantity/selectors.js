import {
	createSelectors
}
from 'reselect'
import {
	linspace, dopri, at
}
from 'numeric'

//define dependent variables --should be pure functions
function x(t) {
	return 4 * Math.cos(t / 4)
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
		return given[name] || quantityData.value
	}
	switch (name) {
	case "x":
		var t = given.t || getValue(state, 't')
		return x(t)
		break;
	case 's':
		var t = given.t || getValue(state, 't')
		return t
	case "y":
		var t = given.t || getValue(state, 't')
		return getValue(state, 'y0')

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



function getSol(state, k, m, c, x0, dx0) {
	//right now only works for y(t) and y'(t)
	var tData = getQuantityData(state, 't')

	var f = function (t, x) {
		k = getValue('k');
		m = getValue('m');
		c = getValue('c');
		return [
			x[1],
			-k / m * x[0] - c / m * x[1]
		];
	};
	var sol = dopri(tData.min, tData.max, [10, 10], f, 1e-6, 2000);
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
