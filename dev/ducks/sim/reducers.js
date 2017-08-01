import { default as quantity } from '../quantity'
import { default as widget } from '../widget'
import { combineReducers } from "redux"

/*
state shape:
sim: {
	loading: "loading", "loaded" or "error"
	widgets:{}
	quantity:{}
}
*/


const loadState = (state = "loading", action) => {
	if (action.hasOwnProperty('payload')) {
		switch (action.type){
			case "FETCH_SIM_DATA":
				return "loading"
			case "INITIALIZE_SIM_STATE":
				return "loaded"
			case "SIM_DATA_FETCH_FAILED":
				return 'error'
			default:
				return state
		}
	} else {
		return state
	}
}

const subReducer = combineReducers({ quantity, widget, loadState })

const simReducer = (state = {}, action) => {
	if (action.hasOwnProperty('payload')) {
		switch (action.type){
			case "INITIALIZE_SIM_STATE":
				const simData = action.payload.simData
				return Object.assign({}, simData, { loadState: "loaded" })
			default:
				return subReducer(state, action)
		}
	} else {
		return state
	}
}

export default simReducer;
