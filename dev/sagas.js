import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import ContentActions from './ducks/content/actions'
import axios from 'axios'
//import Api from '...'

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
export function fetchJson(path) {
	const url = '/'+path.join('/')+'.json'
	return axios.get(url);
}

function* fetchSimData(action) {
	try {
		const response = yield call(fetchJson, action.payload.path);
		yield put(ContentActions.fetchSimDataSucceed(response.data));
	} catch (e) {
		yield put({ type: "SIM_DATA_FETCH_FAILED", message: e.message });
	}
}

/*
  Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/
function* simSaga() {
	yield takeEvery("FETCH_SIM_DATA", fetchSimData);
}

export default simSaga;
