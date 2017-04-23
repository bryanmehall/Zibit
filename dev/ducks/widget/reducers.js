import { combineReducers } from "redux";
import types from "./types";


const widgetsReducer = (state={}, action) => {
	//here state refers to quantities object of state tree
	switch (action.type) {
		case 'ADD_WIDGET':{
			var name = action.payload.name
			return Object.assign({}, state, {type:'change here'})
			break;
		}

	}
	return state
}


export default widgetsReducer;
