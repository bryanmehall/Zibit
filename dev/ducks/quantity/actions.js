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
	return {
		type: "ANIM_PLAY_PAUSE",
		payload: {
			name: name,
			value: value

		}
	}
}

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
	setPlay
};
