import React, { PropTypes } from "react";
import ReactDOM from "react-dom";
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider, connect} from 'react-redux';
import {createLogger} from "redux-logger";
import SmdApp from "./components/SmdApp"
import QuantityActions from './ducks/quantity/actions'
import {getValue, getQuantityData, getAnimatable, getPlaying} from './ducks/quantity/selectors'
import * as reducers from "./ducks";

const rootReducer = combineReducers(reducers)

const animMiddleware = store => next => action => {
	if (action.type === 'ANIM_PLAY') {
		function animStart(){
			var t = Date.now()
			var name = 't'
			var state = store.getState()
			var initValue = getValue(state, name)
			store.dispatch(QuantityActions.animStep(name, t, initValue))
		}
		requestAnimationFrame(animStart);
	} else if (action.type === 'ANIM_STEP') {
		requestAnimationFrame(animStep)
		function animStep(){
			var t0 = action.payload.initTime
			var v0 = action.payload.initValue
			var t = Date.now()
			var value = (t-t0)/1000 +v0
			var name = action.payload.name
			var state = store.getState()
			var isPlaying = getPlaying(state, name)
			if (isPlaying){//only update and continue if quantity is still playing
				store.dispatch(QuantityActions.setValue(name, value))
				store.dispatch(QuantityActions.animStep(name, t0, v0))
			}

		}
	}
	next(action)
};

const middleware = applyMiddleware(animMiddleware)//, createLogger())

const initialAppState = {
	widgets:{
		app:{
			type:'SmdApp',
			props:{},
			children:['massPlot','forcingPlot', 'posPlot','eq']
		},
		eq:{
			type:'Expression',
			props:{
				pos:{x:50,y:50}
			},
			children:['xVal', 'tVal', 'yVal']
		},
		xVal:{
			type:'Value',
			props:{
				quantity:'x',
				active:true
			}
		},
		yVal:{
			type:'Value',
			props:{
				quantity:'y0',
				active:false
			}
		},
		tVal:{
			type:'Value',
			props:{
				quantity:'t',
				active:false
			}
		},
		massPlot:{
			type:'Plot',
			props:{
				xVar:'s',
				yVar:'y',
				xVars:['s','t'],
				yVars:['y','x'],
				width:200,
				height:350,
				pos:{x:250,y:400}
			},
			children:['anchor', 'mass', 'spring']
		},
		anchor:{
			type:'Anchor',
			props:{
				xVar:'s',
				yVar:'x'
			},
			children:[]
		},
		mass:{
			type:'Mass',
			props:{
				xVar:'s',
				yVar:'y'
			},
			children:[]
		},
		spring:{
			type:'Spring',
			props:{
				xVar1:'s',
				yVar1:'x',
				xVar2:'s',
				yVar2:'y'
			},
			children:[]
		},
		posPlot:{
			type:'Plot',
			props:{
				xVar:'t',
				yVar:'y',
				xVars:['t'],
				yVars:['y'],
				width:300,
				height:350,
				pos:{x:500, y:400}
			},
			children:['abstraction1']
		},
		forcingPlot:{
			type:'Plot',
			props:{
				xVar:'x',
				yVar:'imx',
				xVars:['x'],
				yVars:['imx'],
				width:150,
				height:150,
				pos:{x:100, y:500}
			},
			children:[]
		},
		abstraction1:{
			type:"Abstraction",
			props:{
				indVar:"t",
				xVar:"t",
				yVar:"y"
			},
			children:[]
		}
	},
	quantities:{
		t: { //time
			value:0,
			min:0,
			max:20,
			abstractions:300,
			independent:true,
			symbol:'t',
			highlighted:false,
			animation:{playing:false}
		},
		imx: {value:0, min:-10, max:10, abstractions:0, independent:false, symbol:'im(x)', highlighted:false},//imaginary component of x
		x: {value:0, min:-10, max:40, abstractions:0, symbol:'x', prevPoints:[], highlighted:false}, //real component of x
		y: {value:0, min:-30, max:20, symbol:'y', highlighted:false},//position of mass
		k: {value:50, min:0, max:100, symbol:'k', abstractions:10, independent:true, highlighted:false},//spring constant
		m: {value:1, min:0, max:30, symbol:'m', independent:true, highlighted: false},//mass
		c: {value:0, min:0, max:30, symbol:'c', independent:true, highlighted: false },
		y0: {value:0, min:-20, max:20, symbol:<tspan>y<tspan dx="-2" fontSize="0.5em" dy="8">0</tspan></tspan>, independent:true, highlighted:false},//initial mass position
		dy0: {value:0, min:-20, max:20, symbol:'dy0', independent:true, highlighted:false},
		s:{value:0, min:-10, max:10, abstractions:0, symbol:'s', highlighted:false}// lateral position
	}
}

const store = createStore(rootReducer, initialAppState, middleware)

ReactDOM.render(
	<Provider store={store}>
		<SmdApp id="app"/>
	</Provider>,
	document.getElementById('container')
)
