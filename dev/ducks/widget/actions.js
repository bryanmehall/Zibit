import types from "./types";

const addWidget = (name, type, props, children) => ({
	type: "ADD_WIDGET",
	payload: {
		name, type, props, children
	}
})

const setActive = (name, active) => ({
	type: "SET_PROP",
	payload: {
		name,
        prop: "active",
        value: active
	}
})

const addChild = (childName, name) => ({
	type: "ADD_CHILD",
	payload: {
		childName, name
	}
})
const removeChild = (childName, name) => ({
	type: "REMOVE_CHILD",
	payload: {
		name, childName
	}
})

const setProp = (name, prop, value) => ({
	type: "SET_PROP",
	payload: {
		name, prop, value
	}
})



export default {
	addWidget,
	addChild,
	removeChild,
	setProp,
	setActive
}
