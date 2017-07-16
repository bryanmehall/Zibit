
const contentReducer = (state = {}, action) => {
	//here state refers to sim section of tree
	if (action.hasOwnProperty('payload')) {

		//return Object.assign({}, state, {
		//	[name]: quantityReducer(state[name], action)
		//})
		return state
	} else {
		return state
	}
}


export default contentReducer;
