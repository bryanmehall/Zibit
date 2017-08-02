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

const setPlaying = (blockId, value) => {
	console.log('setPlay', blockId, value)
	return {
		type: 'PLAY_CONTENT_ANIM',
		payload: {
			blockId,
			value
		}
	}
}



export default {
	fetchContentBlock,
	fetchPartData,
	setPlaying,
	fetchCourseData,
	initializeCourseState
}
