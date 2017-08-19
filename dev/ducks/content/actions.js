const fetchCourseData = (courseId) => ({
	type: 'FETCH_COURSE_DATA',
	payload: {
		courseId: courseId
	}
})
const activateCourse = (courseId) => ({
	type:"ACTIVATE_COURSE",
	payload:{
		courseId
	}
})
const activateContentBlock = (courseId, partId, contentBlockId) => ({
	type: "ACTIVATE_CONTENT_BLOCK",
	payload: {
		courseId, partId, contentBlockId
	}
})


const initializeCourseState = (courseData) => {
	const parts = courseData.parts
	let initContentBlockActions = []
	const initPartsActions = parts.map((partData) => {
		partData.contentBlocks.forEach((contentBlockData)=>{
			const contentBlockAction = initializeContentBlockState(contentBlockData, courseData.id, partData.id, contentBlockData.id)
			initContentBlockActions.push(contentBlockAction)
		})
		return initializePartState(partData, courseData.id)
	})

	return [
		...initContentBlockActions, //switch to fetch ansynchronously with http2 but keep order in mind
		...initPartsActions,//this order matters because the parts need to be available for rendering
		{
			type: 'INITIALIZE_COURSE_STATE',
			payload: { courseId:courseData.id ,courseData }
		}

	]
}

const initializePartState = (partData, courseId) => ({
	type: 'INITIALIZE_PART_STATE',
	payload: {
		courseId, partData
	}
})

const initializeContentBlockState = (contentBlockData, courseId, partId, contentBlockId) => ({//upgrade to http2 and fetch all asynchronously
	type: 'INITIALIZE_CONTENT_BLOCK_STATE',
	payload: {
		courseId, partId, contentBlockId, contentBlockData
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
	initializeContentBlockState,
	initializePartState,
	setPlaying,
	fetchCourseData,
	initializeCourseState,
	activateCourse,
	activateContentBlock
}
