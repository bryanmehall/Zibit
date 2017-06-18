import React, { PropTypes } from "react";
import ReactDOM from "react-dom";
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider, connect} from 'react-redux';
import {createLogger} from "redux-logger";
import SmdApp from "./components/SmdApp"
import {getActiveTweens, tween, audio} from "./anim"
import QuantityActions from './ducks/quantity/actions'
import {getValue, getQuantityData, getAnimatable, getPlaying} from './ducks/quantity/selectors'
import * as reducers from "./ducks";

const rootReducer = combineReducers(reducers)

const animMiddleware = store => next => action => {
	function animStep() {
		var t0 = action.payload.initTime
		var v0 = action.payload.initValue
		var t = Date.now()
		var value = (t-t0)/1000 + v0
		var name = action.payload.name
		var state = store.getState()
		var isPlaying = getPlaying(state, name)

		if (isPlaying) { //only update and continue if quantity is still playing
			store.dispatch(QuantityActions.setValue(name, value))
			store.dispatch(QuantityActions.animStep(name, t0, v0))
		}

	}
	function animStart(){
		var t = Date.now()
		var name = action.payload.name
		var state = store.getState()
		var initValue = getValue(state, name)
		store.dispatch(QuantityActions.animStep(name, t, initValue))
	}

	if (action.type === "SET_VALUE" && action.payload.name === 'animTime'){
		var state = store.getState()
		var prevTime = getValue(state, 'animTime')
		var t = action.payload.value
		var activeTweens = getActiveTweens(prevTime, t)
		tween(store, activeTweens, t)
		if (audio.paused){
			audio.currentTime = t
		}
	} else if (action.type === 'ANIM_PLAY') {

		requestAnimationFrame(animStart);
	} else if (action.type === 'ANIM_STEP') {
		requestAnimationFrame(animStep)

	}
	next(action)
};

const middleware = applyMiddleware(animMiddleware)//, createLogger())

const initialAppState = {
	widgets: {
		app: {
			type: 'SmdApp',
			props: {},
			children: ['massPlot', 'forcingEq']
		},
		forcingEq: {
			type: 'Expression',
			props: {
				pos: { x: 150, y: 500 }
			},
			children: ['fExt', 'springCoef', 'yVal','tVal' , 'dampCoef', 'dydtVal','t1Val']
		},
		fExt: {
			type: 'Value',
			props: {
				quantity: 'fext',
				active: true
			}
		},
		yVal: {
			type: 'Value',
			props: {
				quantity: 'y',
				active: false
			}
		},
		dampCoef: {
			type: 'Value',
			props: {
				quantity: 'c',
				active: false
			}
		},
		springCoef: {
			type: 'Value',
			props: {
				quantity: 'k',
				active: false
			}
		},
		tVal: {
			type: 'Value',
			props: {
				quantity: 't',
				active: false
			}
		},
		t1Val: {
			type: 'Value',
			props: {
				quantity: 't',
				active: false
			}
		},
		dydtVal: {
			type: 'Value',
			props: {
				quantity: 'dydt',
				active: false
			}
		},
		animVal: {
			type: 'Value',
			props: {
				quantity: 'animTime',
				active: false
			}
		},
		massPlot: {
			type: 'Plot',
			props: {
				xVar: 's',
				yVar: 'y',
				xVars: ['s','t'],
				yVars: ['y','x'],
				width: 200,
				height: 350,
				pos: {x: 100,y: 400},
				visibility: 1
			},
			children: ['anchor', 'mass', 'spring', 'damper']
		},
		anchor: {
			type: 'Anchor',
			props: {
				xVar: 's',
				yVar: 'x'
			},
			children: []
		},
		mass: {
			type: 'Mass',
			props: {
				xVar: 's',
				yVar: 'y'
			},
			children: []
		},
		spring: {
			type: 'Spring',
			props: {
				xVar1: 's',
				yVar1: 'x',
				xVar2: 's',
				yVar2: 'y'
			},
			children: []
		},
		damper: {
			type: 'Damper',
			props: {
				xVar1: 's',
				yVar1: 'x',
				xVar2: 's',
				yVar2: 'y'
			},
			children: []
		},
		abstraction1: {
			type: "Abstraction",
			props: {
				indVar: "t",
				xVar: "t",
				yVar: "y"
			},
			children: []
		}
	},
	quantities: {
		animTime: {
			value: 0, min: 0, max: 28, symbol: 'dispT', independent: true, abstractions: 10, animation: { playing: false }
		},
		t: { //time
			value: 0,
			min: 0,
			max: 20,
			abstractions: 300,
			independent: true,
			symbol: 't)',
			highlighted: false,
			animation: { playing: false }
		},
		imx: { value: 0, min: -10, max: 10, abstractions: 0, independent: false, symbol: 'im(x)', highlighted: false },//imaginary component of x
		x: { value: 0, min: -10, max: 40, abstractions: 0, symbol: 'x(t)', prevPoints: [], highlighted: false }, //real component of x
		y: { value: 0, min: -25, max: 20, symbol: 'y(', highlighted: false },//position of mass
		dydt: { value: 0, min: -25, max: 20, symbol: "y'(", highlighted: false },
		k: { value: 5, min: 0, max: 100, symbol: ' = k', abstractions: 10, independent: true, highlighted: false },//spring constant
		fs: { value: 100, min: -100, max: 100, symbol: <tspan>F<tspan dx="-2" fontSize="0.5em" dy="8">s</tspan></tspan>, independent: false, highlighted: false },
		dl: { value: 10, min: -10, max: 10, symbol: "displacement", independent: false, highlighted: false },
		m: { value: 1, min: 0, max: 30, symbol: 'm', independent: true, highlighted: false },//mass
		c: { value: 0, min: 0, max: 5, symbol: ' + c', independent: true, highlighted: false },
		fext: { value: 10, min: -100, max: 100, symbol: <tspan>F<tspan dx="-2" fontSize="0.5em" dy="8">ext</tspan></tspan>, independent: false, highlighted: false },
		y0: { value: 0, min: -20, max: 20, symbol: <tspan>y<tspan dx="-2" fontSize="0.5em" dy="8">0</tspan></tspan>, independent: true, highlighted: false },//initial mass position
		dy0: { value: 0, min: -20, max: 20, symbol: 'dy0', independent: true, highlighted: false },
		s: { value: 0, min: -6, max: 6, abstractions: 0, symbol: 's', highlighted: false }// lateral position
	}
}

const store = createStore(rootReducer, initialAppState, middleware)

ReactDOM.render(
	<Provider store={store}>
		<SmdApp id="app"/>
	</Provider>,
	document.getElementById('container')
)

