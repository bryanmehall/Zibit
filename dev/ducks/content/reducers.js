const contentReducer = (state = { parts: [] }, action) => {
	//here state refers to content section of tree
	switch (action.type) {
		case "FETCH_COURSE_DATA":
			return Object.assign({}, state, { currentCourse: { loading: true } })
		case "INITIALIZE_COURSE_STATE":
			const courseData = Object.assign(action.payload.courseData, {loading:false})
			return Object.assign({}, state, {currentCourse:courseData})
		default:
			return Object.assign({}, state, partsReducer(state.parts, action))
	}
}

const partsReducer = (state = [], action) => {
	switch (action.type){
		case 'INITIALIZE_PART_STATE':
			console.log('parts reducer', action)
		default:
			return state
	}
}


const blockReducer = (state = {}, action) => {
	console.log()
}


export default contentReducer;
