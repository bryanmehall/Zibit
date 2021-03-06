import { call, put, takeEvery, takeLatest, fork } from 'redux-saga/effects'
import SimActions from './ducks/sim/actions'
import ContentActions from './ducks/content/actions'
import axios from 'axios'
import { lynxParser } from './lynxParser'

function fetchJson(path) {
	let url
	if (typeof path === 'string'){
		url = '/content'+path+'.json'
	} else {
		url = '/content/'+path.join('/')+'.json'
	}
	return axios.get(url)
}
function fetchLynx(path){
    const url = typeof path === 'string' ? '/content'+path+'.lynx'
                                         : '/content/'+path.join('/')+'.lynx'
    return axios.get(url)

}
//sim
function* fetchSimData(action) {
	try {
        let response
        try {
            const lynxFile = yield call(fetchLynx, action.payload.path)
            const corePath = "/courses/experimental/lynx/core"
            const lynxCore = yield call(fetchLynx, corePath)
            const fileData = lynxParser(lynxFile.data)
            const coreData = lynxParser(lynxCore.data)
            //console.log(Object.assign(coreData, fileData))
            response = {
                keyframes: [],
                quantity: {},
                initialState: {
                    object: Object.assign(coreData, fileData), //remove
                    lynxText: lynxFile.data + lynxCore.data
                }
            }
        } catch (e) {
            console.warn('could not find lynx file at ', action.payload.path, e)
            const jsonFile = yield call(fetchJson, action.payload.path)
            response = jsonFile.data
        }
		yield put(SimActions.initializeSimState(response))
	} catch (e) {
		yield put(SimActions.simDataFetchFailed(e))
	}
}

function *simSaga() {
	yield takeEvery("FETCH_SIM_DATA", fetchSimData)
}

//course
function *fetchCourseData(action) {

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
