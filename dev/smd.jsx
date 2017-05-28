import React, { PropTypes } from "react";
import ReactDOM from "react-dom";
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider, connect} from 'react-redux';
import {createLogger} from "redux-logger";
import SmdApp from "./components/SmdApp"
import * as reducers from "./ducks";

const rootReducer = combineReducers(reducers)

const middleware = applyMiddleware(createLogger())

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
				quantity:'y',
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
			children:['mass', 'spring']
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
				yVars:['x'],
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
				yVar:"x"
			},
			children:[]
		}
	},
	quantities:{
		t: { //time
			value:0,
			min:0,
			max:40,
			abstractions:200,
			independent:true,
			symbol:'a',
			highlighted:false,
			animation:{playing:false}
		},
		imx: {value:0, min:-10, max:10, abstractions:0, independent:false, symbol:'im(x)', highlighted:false},//imaginary component of x
		x: {value:0, min:-10, max:40, abstractions:0, symbol:'bc', highlighted:false}, //real component of x
		y: {value:0, min:-30, max:20, symbol:'def', highlighted:false},//position of mass
		k: {value:50, min:0, max:100, symbol:'k', abstractions:10, independent:true, highlighted:false},//spring constant
		m: {value:1, min:0, max:30, symbol:'m', independent:true, highlighted: false},//mass
		y0: {value:0, min:-20, max:20, symbol:'y0', independent:true, highlighted:false},//initial mass position
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
