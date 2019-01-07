import {
	combineReducers
}
from "redux";
import types from "./types";


const widgetsReducer = (state = {}, action) => {
	//here state refers to widgets object of state tree
	switch (action.type) {
        case 'ADD_WIDGET': {
            const name = action.payload.name
            const type = action.payload.type
            const props = action.payload.props
            const children = action.payload.children || []
            return Object.assign({}, state, {
                [name]: {
                    type, props, children
                }
            })
        }
        case 'REMOVE_WIDGET':{
            const name = action
            break;
        }
        case 'SET_PROP':{
            const name = action.payload.name

            return Object.assign({}, state, {
                    [name]: widgetReducer(state[name], action)
            })
        }
        case 'ADD_CHILD':{
            const name = action.payload.name
            return Object.assign({}, state, {
                    [name]: widgetReducer(state[name], action)
            })
        }
        case 'REMOVE_CHILD':{
            const name = action.payload.name
            return Object.assign({}, state, {
                    [name]: widgetReducer(state[name], action)
            })
        }
	}
	return state
}
const widgetReducer = (state ={}, action) => {
	switch (action.type) {
		case "ADD_CHILD": {
			const childName = action.payload.childName
			const newChildren = state.children.concat(childName)
			const newState = Object.assign({}, state, {
				children: newChildren
			})
			return newState
		}
		case "REMOVE_CHILD": {
			const childName = action.payload.childName
			const newChildren = state.children.filter((name) => (name !== childName))
			const newState = Object.assign({}, state, {
				children: newChildren
			})
			return newState
		}
		case "SET_PROP": {
			const name = action.payload.name
			const prop = action.payload.prop
			const value = action.payload.value
			const newProps = Object.assign({}, state.props, {
				[prop]: value
			})
			const newState = Object.assign({}, state, {
				props: newProps
			})

			return newState
		}
		default: {
			return state
		}
	}
    return {}
}


export default widgetsReducer;
