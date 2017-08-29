const getSimData = (state) => (state.sim)

export const getLoadState = (state) => (getSimData(state).loadState)

export const getKeyframes = (state) => (getSimData(state).keyframes)
