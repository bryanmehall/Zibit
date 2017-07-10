import React, { PropTypes } from "react"
import ReactDOM from "react-dom"

import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider, connect} from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import {createLogger} from "redux-logger"

import createHistory from 'history/createBrowserHistory'
import { Route } from 'react-router'

import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'
import Courses from "./components/Courses"
import Home from "./components/Home"
import { animMiddleware } from "./animMiddleware"
import { runTests } from './tests'
import QuantityActions from './ducks/quantity/actions'
import { getValue, getAnimatable, getMax, getPlaying } from './ducks/quantity/selectors'
import * as reducers from "./ducks"
import { initialState }  from '../content/controlSystems/dho/intro'

const rootReducer = combineReducers({...reducers, router: routerReducer})
const middleware = applyMiddleware(animMiddleware)
const history = createHistory()
const composeEnhancers = composeWithDevTools({})// Specify here name, actionsBlacklist, actionsCreators and other options
const store = createStore(rootReducer, JSON.parse(initialState), composeEnhancers(middleware))
store.subscribe(() => { runTests(store.getState()) })
const container = document.getElementById('container')

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



