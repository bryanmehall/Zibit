import {keyframesToActions} from '../../anim'
import ContentActions from '../content/actions'

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
const startUserInteraction = (courseId, partId, contentBlockId) => {
	return [
		ContentActions.setPlaying(courseId, partId, contentBlockId, false),
		{
			type: "START_USER_INTERACTION"
		}
	]
}
const returnToAnimation = () => {
	return {
		type: "RETURN_TO_ANIMATION"
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
	simDataFetchFailed,
	startUserInteraction,
	returnToAnimation
}
