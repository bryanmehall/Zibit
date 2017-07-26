import { call, put, takeEvery, takeLatest, fork } from 'redux-saga/effects'
import SimActions from './ducks/sim/actions'
import ContentActions from './ducks/content/actions'
import axios from 'axios'

function fetchJson(path) {
	let url
	if (typeof path === 'string'){
		url = path+'.json'
	} else {
		url = '/'+path.join('/')+'.json'
	}
	return axios.get(url)
}
//sim
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

//contentBlock
function* fetchContentBlockData(action) {
	try {
		const response = yield call(fetchJson, action.payload.path)
		yield put(ContentActions.initializeContentBlockState(response.data))
	} catch (e) {
		yield put({ type: "CONTENT_BLOCK_FETCH_FAILED", message: e.message })
	}
}

function* contentBlockSaga() {
	yield takeEvery("FETCH_CONTENT_BLOCK_DATA", fetchContentBlockData)
}

//part
function* fetchPartData(action) {
	try {
		const response = yield call(fetchJson, action.payload.path)
		yield put(ContentActions.initializePartState(response.data))
	} catch (e) {
		yield put({ type: "PART_FETCH_FAILED", message: e.message })
	}
}

function* partSaga() {
	yield takeEvery("FETCH_PART_DATA", fetchPartData)
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
		fork(partSaga),
		fork(simSaga),
		fork(contentBlockSaga)
	]
}
export default rootSaga
