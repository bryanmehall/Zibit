import types from "./types";

import {
	bindActionCreators
}
from 'redux'




const setValue = (name, value) => ({
	type: "SET_VALUE",
	payload: {
		name: name,
		value: value
	}
})

const setPlay = (name, value) => {
	if (value === true) {
		return {
			type: "ANIM_PLAY",
			payload: {
				name: name,
				value: value

			}
		}
	} else {
		return {
			type: "ANIM_PAUSE",
			payload: {
				name: name,
				value: false

			}
		}
	}

}

const animStep = (name, initTime, initValue) => ({
	type: 'ANIM_STEP',
	payload: {
		name, initValue, initTime
	}
})

function invert(tValue, scale) {
	var range = scale.max - scale.min;
	var tRange = scale.tMax - scale.tMin;
	return (tValue - scale.tMin) / tRange * range + scale.min;
}

const setValueFromCoords = (name, tValue, scale) => {
	var value = invert(tValue, scale) //should be in reducer?
	return setValue(name, value)
}

const setHighlight = (name, value) => ({
	type: "SET_HIGHLIGHT",
	payload: {
		name,
		value
	}
})


export default {
	setValue,
	setValueFromCoords,
	setHighlight,
	setPlay,
	animStep
};
