export function setValue(name, value) {
  return { type: "SET_VALUE", payload:{name:name, value:value} };
}

export function select(name){
	return {type:"SELECT", payload: name}
}
