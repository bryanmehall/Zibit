const fetchSimData = (path) => ({
	type: 'FETCH_SIM_DATA',
	payload: {
		path: path
	}
})

const initializeSimState = (contentBlockData) => {
	console.log('running', simData)

	return {
		type: 'INITIALIZE_SIM_STATE',
		payload: {
			simData: initialState
		}
	}
}
export default {
	fetchSimData,
	initializeSimState
}
