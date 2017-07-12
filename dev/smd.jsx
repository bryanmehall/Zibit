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


import { initialState }  from '../courses/controlsystems/dho/intro'

const sagaMiddleware = createSagaMiddleware()
const rootReducer = combineReducers({...reducers, router: routerReducer})
const middleware = applyMiddleware(animMiddleware, sagaMiddleware)
const history = createHistory()
const composeEnhancers = composeWithDevTools({})// Specify here name, actionsBlacklist, actionsCreators and other options
const store = createStore(rootReducer, JSON.parse(initialState), composeEnhancers(middleware))
store.subscribe(() => { runTests(store.getState()) })
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



