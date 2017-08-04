//import types from "./types";
const defaultQuantityState = { //is this needed because we never create new quantities at runtime
	value: 0,
	selected: false,
	min: 0,
	max: 1,
	independent: false,
	abstractions: 0,
	state: "none"
}

export const quantityReducer = (state = defaultQuantityState, action) => {
	//here state refers to an individual quantity object
	switch (action.type) {
		case 'SET_VALUE': {
			const value = action.payload.value
			const updatedFields = { value: action.payload.value }
			if (action.payload.keepHistory){
				console.log( state.previousValues)
				updatedFields.previousValues = state.previousValues.concat(value)
			}
			return Object.assign({}, state, updatedFields)
		}

		case 'RESET_PREVIOUS_VALUES': {
			return Object.assign({}, state, { previousValues: [] })
		}

		case 'SET_HIGHLIGHT': {
			return Object.assign({}, state, {
				highlighted: action.payload.value
			})
		}

		case 'ANIM_PLAY': {
			let animObj = state.animation
			let newAnimObject = Object.assign({}, animObj, {
				playing: true
			})
			return Object.assign({}, state, {
				animation: newAnimObject
			})
		}

		case 'ANIM_PAUSE': {
			let animObj = state.animation
			let newAnimObject = Object.assign({}, animObj, {
				playing: false
			})
			return Object.assign({}, state, {
				animation: newAnimObject
			})
		}

	}
	return state
}

const quantitiesReducer = (state = {}, action) => {
	//here state refers to quantities object of state tree
	if (action.hasOwnProperty('payload')) {
		let name = action.payload.name
		return Object.assign({}, state, {
			[name]: quantityReducer(state[name], action)
		})

	} else {
		return state
	}
}


export default quantitiesReducer;
