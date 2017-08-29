import {keyframesToActions} from '../../anim'

const fetchSimData = (path) => ({
	type: 'FETCH_SIM_DATA',
	payload: {
		path: path
	}
})

const initializeSimState = (simData) => {
	//initialize keyframes, selector functions ...? ...here
	let normalizedKeyframes = []

	if (simData.hasOwnProperty('keyframes')){

		normalizedKeyframes = simData.keyframes.reduce(keyframesToActions, [])//do at compile time
	}
	return {
		type: 'INITIALIZE_SIM_STATE',
		payload: {
			simData: simData.initialState,
			keyframes:normalizedKeyframes
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
