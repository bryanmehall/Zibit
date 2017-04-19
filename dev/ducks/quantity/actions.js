import types from "./types";

const setValue = ( name, value ) => ({
  type: "SET_VALUE",
	payload:{name:name, value:value}
} );

const select = ( name ) => ( {
	type:"SELECT",
	payload: name
} );

export default {
	setValue,
	select
};
