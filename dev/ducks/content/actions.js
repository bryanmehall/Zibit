const fetchCourseData = (courseId) => ({
	type: 'FETCH_COURSE_DATA',
	payload: {
		courseId: courseId
	}
})

const initializeCourseState = (courseData) => {
	const parts = courseData.parts
	const initPartsActions = parts.map((partData) => (
		initializePartState(partData, courseData.id)
	))
	return [
		{
			type: 'INITIALIZE_COURSE_STATE',
			payload: { courseData }
		},
		...initPartsActions
	]
}

const initializePartState = (partData, courseId) => ({
	type: 'INITIALIZE_PART_STATE',
	payload: {
		courseId, partData
	}
})

const fetchContentBlock = (path) => ({
	type: 'INITIALIZE_CONTENT_BLOCK_STATE',
	payload: {
		path: path
	}
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
	initializePartState,
	setPlaying,
	fetchCourseData,
	initializeCourseState
}
