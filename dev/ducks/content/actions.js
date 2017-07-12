const fetchSimData = (path) => ({
	type: 'FETCH_SIM_DATA',
	payload: {
		path: path
	}
})

const fetchSimDataSucceed = (simData) => ({
	type: 'SIM_DATA_FETCH_SUCCEEDED',
	payload: {
		simData: simData
	}
})
export default {
	fetchSimData,
	fetchSimDataSucceed
}
