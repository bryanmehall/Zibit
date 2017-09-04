import { default as quantity } from '../quantity'
import { default as widget } from '../widget'
import { combineReducers } from "redux"

/*
state shape:
sim: {
	cache:{
		cached:true of false
		quantity:{}
		widgets:{}
	}
	keyframes:[

	]
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
const cache = (state={cached:false}, action) => (state)

const subReducer = combineReducers({ quantity, widget, loadState, keyframes, cache })

const simReducer = (state = {cache:{cached:false}}, action) => {
	switch (action.type){
		case "INITIALIZE_SIM_STATE":
			const simData = action.payload.simData
			const normalizedKeyframes = keyframes([], action)
			return Object.assign({}, simData, { loadState: "loaded", cache:{cached:false}, keyframes:normalizedKeyframes})
		case "START_USER_INTERACTION": {//eventually this should be put somewhere else. maybe in the content block state?
			const currentState = {
				cached:true,
				widget: state.widget,
				quantity: state.quantity
			}
			return Object.assign({}, state, {cache:currentState})
		}
		case "RETURN_TO_ANIMATION": {
			if (state.cache.cached){
				const cache = state.cache
				const cachedState = {
					widget: cache.widget,
					quantity: cache.quantity
				}
				return Object.assign({}, state, cachedState, {cache:{cached:false}})
			} else {
				return state
			}
		}
		default:
			return subReducer(state, action)
	}
}

export default simReducer;
