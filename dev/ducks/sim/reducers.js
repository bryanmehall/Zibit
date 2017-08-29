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
}
const keyframes = (state=[], action) => {
	switch(action.type){
		case "INITIALIZE_SIM_STATE":{
			return action.payload.keyframes
		}
		default:{
			return state
		}
	}
}

const subReducer = combineReducers({ quantity, widget, loadState, keyframes })

const simReducer = (state = {}, action) => {
	switch (action.type){
		case "INITIALIZE_SIM_STATE":
			const simData = action.payload.simData
			const normalizedKeyframes = keyframes([], action)
			return Object.assign({}, simData, { loadState: "loaded", keyframes:normalizedKeyframes})
		default:
			return subReducer(state, action)
	}
}

export default simReducer;
