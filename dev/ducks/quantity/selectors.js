import {createSelectors} from 'reselect'
import {linspace, dopri, at} from 'numeric'
//define dependent variables --should be pure functions
function x(t){
	return 4*Math.sin(t/4)+5
}

function y(sol, t){
	return t
}

export const getQuantityData = function(state, name){
	switch (name){
		case "x":
			return state.quantities.x
			break;
		//possibly put below in default case
		case "t":
			return state.quantities.t
			break;
		case "c":
			return state.quantities.c
			break;
		case "m":
			return state.quantities.m
			break;
		case "k":
			return state.quantities.k
			break;
		default:
			if (name === undefined){
				throw 'Selector Error: name is undefined'
			} else {
				throw 'quantitiy', name, 'not found'
			}

	}
}

export const getValue = function (state, name, given){
	var given = given || {}
	//given is an object of independent variables that replace concrete values
	var quantityData = getQuantityData(state, name)
	if (quantityData.independent){
		return given[name] || quantityData.value
	}
	switch(name){
		case "x":
			var t = given.t || getValue(state, 't')
			return x(t)
			break;
		default:
			throw "make sure that "+name+" is labeled as independent"
	}
}



function getSol(state, k,m,c,x0,dx0){
	//right now only works for y(t) and y'(t)
	var tData = getQuantityData(state, 't')

	var f = function(t,x) {
		k = getValue('k');
		m = getValue('m');
		c = getValue('c');
		return [
			x[1],
			-k/m*x[0]-c/m*x[1]
		];
	};
	var sol = dopri(tData.min,tData.max,[10,10],f,1e-6,2000);
}

export const getAbsValues = function(state, name, absName){
	//abstract name w.r.t. absName
	var absData = getQuantityData(state, absName)
	var absPoints = linspace(absData.min,absData.max,absData.abstractions)
	var values = absPoints.map(function(val){
		return getValue(state, name, {[absName]:val})
	})
	return values
}

export const getAbsPoints = function(state, indVar, xVar, yVar){
	var xPoints = getAbsValues(state, xVar, indVar)
	var yPoints = getAbsValues(state, yVar, indVar)
	var points = xPoints.map(function(xVal,i){
		return {x:xVal, y:yPoints[i]}
	})
	return points
}

export const getSecondaryAbsPoints = function(state, name, absName){

}
