import { combineReducers } from "redux";
import types from "./types";

/*
quantities:{
	t:{
		name:
	}
}
*/

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

const quantitiesReducer = (state={}, action) => {
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


export default quantitiesReducer;
