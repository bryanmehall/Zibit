import { quantityReducer } from '../quantity/reducers'
const contentReducer = (state = {}, action) => {
	//here state refers to sim section of tree
	if (action.hasOwnProperty('payload')) {
		switch (action.type) {
			case "FETCH_COURSE_DATA":
				return Object.assign({}, state, {currentCourse:{loading:true}})
			case "INITIALIZE_COURSE_STATE":
				const courseData = Object.assign(action.payload.courseData, {loading:false})
				return Object.assign({}, state, {currentCourse:courseData})
			default:
				return state
		}
		return state
	} else {
		return state
	}
}


export default contentReducer;
