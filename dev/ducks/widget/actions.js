import types from "./types";
const setActive = (id, active) => ({
	type: "SET_ACTIVE",
	payload: {
		active: active
	}
})
const addWidget = (parent, name, type, props, children) => ({
	type: "ADD_WIDGET",
	payload: {
		name, parent, type, props, children
	}
});


export default {
	addWidget,
	setActive
};
