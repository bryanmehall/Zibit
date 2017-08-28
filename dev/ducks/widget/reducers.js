import {
	combineReducers
}
from "redux";
import types from "./types";


const widgetsReducer = (state = {}, action) => {
	//here state refers to widgets object of state tree
	switch (action.type) {
        case 'ADD_WIDGET': {
            var name = action.payload.name
            var type = action.payload.type
            var props = action.payload.props
            var children = action.payload.children || []
            return Object.assign({}, state, {
                            [name]: {
                    type, props, children
                }
            })
        }
        case 'REMOVE_WIDGET':{
            var name = action
            break;
        }
        case 'SET_PROP':{
            var name = action.payload.name

            return Object.assign({}, state, {
                    [name]: widgetReducer(state[name], action)
            })
        }
        case 'ADD_CHILD':{
            var name = action.payload.name
            return Object.assign({}, state, {
                    [name]: widgetReducer(state[name], action)
            })
        }
        case 'REMOVE_CHILD':{
            var name = action.payload.name
            return Object.assign({}, state, {
                    [name]: widgetReducer(state[name], action)
            })
        }
	}
	return state
}
const widgetReducer = (state, action) => {
	switch (action.type) {
	case "ADD_CHILD":
		var childName = action.payload.childName
		var newChildren = state.children.concat(childName)
		var newState = Object.assign({}, state, {
			children: newChildren
		})
		return newState
		break;
	case "REMOVE_CHILD":
		var childName = action.payload.childName
		var newChildren = state.children.filter((name) => (name !== childName))
		var newState = Object.assign({}, state, {
			children: newChildren
		})
		return newState
		break;
	case "SET_PROP":
		var name = action.payload.name
		var propName = action.payload.propName
		var value = action.payload.value
		var newProps = Object.assign({}, state.props, {
			[propName]: value
		})
		var newState = Object.assign({}, state, {
			props: newProps
		})

		return newState
	}
    return {}
}


export default widgetsReducer;
