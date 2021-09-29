const getSimData = (state) => (state.sim)

export const getLoadState = (state) => (getSimData(state).loadState)

export const getKeyframes = (state) => (getSimData(state).keyframes)

export const getNextAction = (state) => {
    console.log(getSimData(state))
    getSimData(state).onComplete
}