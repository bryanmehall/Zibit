import types from "./types";
import {
	bindActionCreators
}
from 'redux'

import {
	getValue
}
from './selectors'

function animate(quantity) {
	var t0 = new Date()
	var v0 = getValue()
	var step = function () {
		var globalT = new Date()
		var t = (globalT - t0) / 1000
		var value = t + v0
		self.props.setValue(self.props.quantity, value)
		console.log('updating', value)
		if (self.props.playing) {
			window.requestAnimationFrame(step)
		}
	}
	window.requestAnimationFrame(step)
}

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

const animStep = (name, initTime, initValue) => {
	return {
		type: 'ANIM_STEP',
		payload: {
			name, initValue, initTime
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
	setPlay,
	animStep
};
