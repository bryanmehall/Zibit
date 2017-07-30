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


const initialState = {
	content: {
		currentCourse:{
			loading: true
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
//configure middleware
//const sentryPublicDSN = 'https://ba48e0434a8a4973b9b70447fa4aa4f4@sentry.io/191832'
//const ravenMiddleware = RavenMiddleware(sentryPublicDSN)
const sagaMiddleware = createSagaMiddleware()
const middleware = applyMiddleware(animMiddleware, sagaMiddleware) //ravenMiddleware)


const rootReducer = combineReducers({ ...reducers, router: routerReducer })
const history = createHistory()
const composeEnhancers = composeWithDevTools({})// specify here name, actionsBlacklist, actionsCreators and other options
const store = createStore(rootReducer, initialState, composeEnhancers(middleware))
//store.subscribe(() => { runTests(store.getState()) })
const container = document.getElementById('container')

sagaMiddleware.run(rootSaga)

ReactDOM.render(
	<Provider store={store}>

		<ConnectedRouter history={history}>
			<div>

				<Route exact path="/" component={Home}/>

				<Route path="/courses" component={NavBar}/>
				<Route path="/courses" component={Courses}/>


			</div>
		</ConnectedRouter>
	</Provider>,
	container
)


