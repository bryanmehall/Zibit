const getCurrentCourse = (state) => (state.content.currentCourse)
const getCurrentPart = (state) => (state.content.currentPart)
const getCurrentContent = (state) => (state.content.currentContent)

export const getCurrentCourseName = (state) => (getCurrentCourse(state).name)
export const getCurrentPartName = (state) => (getCurrentPart(state).name)
export const getCurrentContentName = (state) => (getCurrentContent(state).name)
