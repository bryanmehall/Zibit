import { default as quantity } from '../quantity'
import { default as widget } from '../widget'
import { combineReducers } from "redux"
const subReducer = combineReducers({ quantity, widget })

/*
state shape:
sim: {
	loading: bool
	widgets:{}
	quantity:{}
}
*/
const simReducer = (state = {}, action) => {
	if (action.hasOwnProperty('payload')) {

		switch (action.type){
			case "INITIALIZE_SIM_STATE":
				const simData = action.payload.simData
				return Object.assign({}, simData, { loading: false })

			default:
				return subReducer(state, action)
		}

	} else {
		return state
	}
}


export default simReducer;
