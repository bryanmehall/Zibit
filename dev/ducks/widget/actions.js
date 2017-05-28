import types from "./types";
const setActive = (id, active) => ({
	type: "SET_ACTIVE",
	payload: {
		active: active
	}
})
const addWidget = (parent, id, type, props) => ({
	type: "ADD_WIDGET",
	payload: 'change here'
});


export default {
	addWidget,
	setActive
};
