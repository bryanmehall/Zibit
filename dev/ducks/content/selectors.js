const getCurrentCourse = (state) => (state.content.currentCourse)
const getCurrentPart = (state) => (state.content.currentPart)
const getCurrentContent = (state) => (state.content.currentContent)

export const courseIsLoading = (state) => (getCurrentCourse(state).loading)
export const getParts = (state) => (getCurrentCourse(state).parts)

export const getPart = (state, partId) => {
	return getParts(state).find((part) => (part.id === partId))
}


//part selectors
export const getPartTitle = (partDescriptor) => (partDescriptor.title)
export const getPartId = (partDescriptor) => (partDescriptor.id)

//contentBlock selectors
export const getContentBlocks = (state, partId) => (getPart(state, partId).contentBlocks)
export const getCurrentCourseName = (state) => (getCurrentCourse(state).name)
export const getCurrentPartName = (state) => (getCurrentPart(state).name)
export const getCurrentContentName = (state) => (getCurrentContent(state).name)
