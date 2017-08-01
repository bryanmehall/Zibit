const getSimData = (state) => (state.sim)

export const getLoadState = (state) => (getSimData(state).loadState)
