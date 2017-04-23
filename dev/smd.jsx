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
			children:['massPlot']
		},
		massPlot:{
			type:'Plot',
			props:{
				xVar:'x',
				yVar:'x',
				width:200,
				height:200,
				pos:{x:200,y:400}
			},
			children:['abstraction2']
		},

		abstraction1:{
			type:"Abstraction",
			props:{
				indVar:"t",
				xVar:"t",
				yVar:"x"
			},
			children:[]
		},
		abstraction2:{
			type:"Abstraction",
			props:{
				indVar:"t",
				xVar:"x",
				yVar:"x"
			},
			children:[]
		},

	},
	quantities:{
		t:{value:0, min:-100, max:40, abstractions:200, independent:true, symbol:'t', highlighted:false},
		x:{value:0, min:-10, max:10, abstractions:0, symbol:'x', highlighted:false}
	}
}

const store = createStore(rootReducer, initialAppState, middleware)

ReactDOM.render(
	<Provider store={store}>
		<SmdApp id="app"/>
	</Provider>,
	document.getElementById('container')
)
