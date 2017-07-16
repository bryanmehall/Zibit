//react
import React, { PropTypes } from "react"
import ReactDOM from "react-dom"
//redux
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider, connect} from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import {createLogger} from "redux-logger"
import * as reducers from "./ducks"
//routing
import createHistory from 'history/createBrowserHistory'
import { Route } from 'react-router'
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'
//async
import createSagaMiddleware from 'redux-saga'
import simSaga from './sagas'

//components
import Courses from "./components/Courses"
import Home from "./components/Home"
//content
import { animMiddleware } from "./animMiddleware"
import { runTests } from './tests'


const initialState = {

	content: {
		activeCourse: "controlStystems",
		activePart: "simpleharmonicoscillator",
		activeBlock: {
			id: "damping",
			anim: { //must be a quantity object
					"value": 0,
					"min": 0,
					"max": 28,
					"symbol": "dispT",
					"independent": true,
					"abstractions": 10,
					"animation": {
						"playing": false
					}
				}
		}
	},
	sim: {
		loading:true,
		widget: {
			"app": {
				"type": "SmdApp",
				"props": { loading:true},
				"children": [
				]
			}
		}

	}
}

const sagaMiddleware = createSagaMiddleware()
const rootReducer = combineReducers({ ...reducers, router: routerReducer })
const middleware = applyMiddleware(animMiddleware, sagaMiddleware)
const history = createHistory()
const composeEnhancers = composeWithDevTools({})// specify here name, actionsBlacklist, actionsCreators and other options
const store = createStore(rootReducer, initialState, composeEnhancers(middleware))
//store.subscribe(() => { runTests(store.getState()) })
const container = document.getElementById('container')
sagaMiddleware.run(simSaga)
ReactDOM.render(
	<Provider store={store}>

		<ConnectedRouter history={history}>
			<div>
				<Route exact path="/" component={Home}/>
				<Route path="/courses" component={Courses}>
				</Route>
			</div>
		</ConnectedRouter>
	</Provider>,
	container
)



