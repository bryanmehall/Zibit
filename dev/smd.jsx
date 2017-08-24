//react
import React, { PropTypes } from "react"
import ReactDOM from "react-dom"
//redux
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider, connect} from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import {createLogger} from "redux-logger"
import * as reducers from "./ducks"
import reduxMulti from 'redux-multi'
import { batchedSubscribe } from 'redux-batched-subscribe'
//routing
import createHistory from 'history/createBrowserHistory'
import { connectRoutes } from 'redux-first-router'
import { Route, Redirect } from 'react-router'
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'
//async
import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas'

//components
import Courses from "./components/Courses"
import Home from "./components/Home"
import NavBar from "./components/NavBar"
//content
import { animMiddleware } from "./animMiddleware"
import { runTests } from './tests'

// error reporting
import RavenMiddleware from 'redux-raven-middleware';

//initial state
const initialState = {
	sim: {
		widget: {
			"app": {
				"type": "SmdApp",
				"props": { loading: true },
				"children": [
				]
			}
		}

	}
}

//configure routes
const routesMap = {
	HOME: '/', // action <-> url path
	ACTIVATE_COURSE: '/courses/:courseId', // :id is a dynamic segment
	ACTIVATE_PART: '/courses/:courseId/:partId',
	ACTIVATE_CONTENT_BLOCK: '/courses/:courseId/:partId/:contentBlockId'
}

const history = createHistory()
const router = connectRoutes(history, routesMap)
//configure middleware
//const sentryPublicDSN = 'https://ba48e0434a8a4973b9b70447fa4aa4f4@sentry.io/191832'
//const ravenMiddleware = RavenMiddleware(sentryPublicDSN)
const sagaMiddleware = createSagaMiddleware()
const middleware = applyMiddleware(animMiddleware, sagaMiddleware, reduxMulti, router.middleware) //ravenMiddleware)



const rootReducer = combineReducers({ ...reducers, location: router.reducer })

const composeEnhancers = composeWithDevTools({})// specify here name, actionsBlacklist, actionsCreators and other options

const enhancers = composeEnhancers(
	middleware,
	router.enhancer,
	batchedSubscribe((notify) => { //for patching dispatch of actions
		notify();
	})
)
const store = createStore(rootReducer, initialState, enhancers)
//store.subscribe(() => { runTests(store.getState()) })
const container = document.getElementById('container')

sagaMiddleware.run(rootSaga)

ReactDOM.render(
	<Provider store={store}>
		<Home/>
	</Provider>,
	container
)


