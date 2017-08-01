const fetchSimData = (path) => ({
	type: 'FETCH_SIM_DATA',
	payload: {
		path: path
	}
})

const initializeSimState = (contentBlockData) => {
	//initialize keyframes, selector functions ...? ...here
	return {
		type: 'INITIALIZE_SIM_STATE',
		payload: {
			simData: contentBlockData.initialState
		}
	}
}

const simDataFetchFailed = (error) => (
	{
		type: "SIM_DATA_FETCH_FAILED",
		payload:{
			message: error.message
		}
	}
)




export default {
	fetchSimData,
	initializeSimState,
	simDataFetchFailed
}
