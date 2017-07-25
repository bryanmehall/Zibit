const fetchContentBlock = (path) => ({
	type: 'FETCH_CONTENT_BLOCK_DATA',
	payload: {
		path: path
	}
})
const fetchPartData = (courseId, partId) => ({
	type: 'FETCH_PART_DATA',
	payload: {
		courseId, partId
	}
})
const fetchCourseData = (courseId) => ({
	type: 'FETCH_COURSE_DATA',
	payload: {
		courseId: courseId
	}
})
const initializeCourseState = (courseData) => ({
	type: 'INITIALIZE_COURSE_STATE',
	payload: { courseData }
})



export default {
	fetchContentBlock,
	fetchPartData,
	fetchCourseData,
	initializeCourseState
}
