import { call, put, takeEvery, takeLatest, fork } from 'redux-saga/effects'
import SimActions from './ducks/sim/actions'
import ContentActions from './ducks/content/actions'
import axios from 'axios'

function fetchJson(path) {
	let url
	if (typeof path === 'string'){
		url = '/content'+path+'.json'
	} else {
		url = '/content/'+path.join('/')+'.json'
	}
	return axios.get(url)
}

//sim
function* fetchSimData(action) {
	try {
		const response = yield call(fetchJson, action.payload.path)
		yield put(SimActions.initializeSimState(response.data))
	} catch (e) {

		yield put(SimActions.simDataFetchFailed(e))
	}
}

function* simSaga() {
	yield takeEvery("FETCH_SIM_DATA", fetchSimData)
}

//course
function* fetchCourseData(action) {

	try {
		const path = ['courses', action.payload.courseId, 'meta']
		const response = yield call(fetchJson, path)
		yield put(ContentActions.initializeCourseState(response.data))
	} catch (e) {
		console.log('e', e)
		yield put({ type: "COURSE_FETCH_FAILED", message: e.message })
	}
}

function* courseSaga() {
	yield takeEvery("FETCH_COURSE_DATA", fetchCourseData)
}

function* rootSaga() {
	yield [
		fork(courseSaga),
		fork(simSaga),
	]
}
export default rootSaga
