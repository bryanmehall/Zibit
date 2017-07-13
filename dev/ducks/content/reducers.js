const contentReducer = (state = {}, action) => {
	//here state refers to entire state tree
	if (action.hasOwnProperty('payload')) {

		console.log(state)
		//return Object.assign({}, state, {
		//	[name]: quantityReducer(state[name], action)
		//})
		return {}
	} else {
		return state
	}
}


export default contentReducer;
