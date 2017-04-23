import types from "./types";

const setValue = (name, value) => ({
	type: "SET_VALUE",
	payload: {
		name: name,
		value: value
	}
});

const setHighlight = (name, value) => ({
	type: "SET_HIGHLIGHT",
	payload: {
		name,
		value
	}
});


export default {
	setValue,
	setHighlight
};
