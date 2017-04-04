import React, { PropTypes } from "react";
import ReactDOM from "react-dom";
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider, connect} from 'react-redux';
import {createLogger} from "redux-logger";
import Slider from "./components/Slider"
import Scale from "./components/Scale"
import SmdApp from "./components/SmdApp"
import * as QuantityActions from './actions/quantity';
//reducers/quantity.js
const quantityReducer = (state={value:0, selected:false, min:0, max:1, independent:false, abstractions:0}, action) => {
	//here state refers to an individual quantity object
	switch (action.type) {
		case 'SET_VALUE':{
			return Object.assign({}, state, {value:action.payload.value})
			break;
		}
		case 'SELECT':{
			return Object.assign({}, state, {selected:true})
			break;
		}
	}
	return state
}

const quantitiesReducer = (state={}, action)=> {
	//here state refers to quantities object of state tree
	switch (action.type) {
		case 'SET_VALUE':{
			var name = action.payload.name
			return Object.assign({}, state, {[name]:quantityReducer(state[name], action)})
			break;
		}
		case 'SELECT':{
			var name = action.payload.name
			return Object.assign({}, state, {[name]:quantityReducer(state[name], action)})
			break;
		}
	}
	return state
}

//reducers/index.js
const reducers = combineReducers({
  quantities:quantitiesReducer
})

const middleware = applyMiddleware(createLogger())
const initialAppState = {
	quantities:{
		t:{},

	}
}

const store = createStore(reducers, initialAppState, middleware)

store.dispatch({type:'SET_VALUE', payload:{name:'t', value:20}})
store.dispatch({type:'SELECT', payload:{name:'t'}})
store.dispatch({type:'SET_VALUE', payload:{name:'t', value:40}})








ReactDOM.render(
	<Provider store={store}>
		<SmdApp/>
	</Provider>,
	document.getElementById('container')
)
