import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import SimActions from './ducks/sim/actions'
import axios from 'axios'

function fetchJson(path) {
	const url = '/'+path.join('/')+'.json'
	return axios.get(url)
}

function* fetchSimData(action) {
	try {
		const response = yield call(fetchJson, action.payload.path)
		yield put(SimActions.initializeSimState(response.data))
	} catch (e) {
		yield put({ type: "SIM_DATA_FETCH_FAILED", message: e.message })
	}
}

function* simSaga() {
	yield takeEvery("FETCH_SIM_DATA", fetchSimData)
}

export default simSaga
