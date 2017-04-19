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
	quantities:{
		t:{value:0, min:0, max:40, abstractions:200, independent:true},
		x:{value:0, min:0, max:10, abstractions:0}
	}
}

const store = createStore(rootReducer, initialAppState, middleware)


ReactDOM.render(
	<Provider store={store}>
		<SmdApp/>
	</Provider>,
	document.getElementById('container')
)
