import React, { PropTypes } from "react";
import ReactDOM from "react-dom";

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider, connect} from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import {createLogger} from "redux-logger";

import createHistory from 'history/createBrowserHistory'
import { Route } from 'react-router'

import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'
import SmdApp from "./components/SmdApp"
import { animMiddleware } from "./animMiddleware"
import { runTests } from './tests'
import QuantityActions from './ducks/quantity/actions'
import { getValue, getAnimatable, getMax, getPlaying } from './ducks/quantity/selectors'
import * as reducers from "./ducks";


const rootReducer = combineReducers({...reducers, router: routerReducer})



const middleware = applyMiddleware(animMiddleware)
const history = createHistory()

const initialAppState = {
	widgets: {
		app: {
			type: 'SmdApp',
			props: {},
			children: ['massPlot', 'forcingEq']
		},
		forcingEq: {
			type: 'NewExpression',
			props: {
				pos: { x: 150, y: 500 }
			},
			children: ['fExt','eq1', 'springCoef', 'yVal','lp1','tVal','rp1' ,'plus1', 'dampCoef', 'dydtVal','lp2','tVal1','rp2']
		},
		fExt: {
			type: 'NewValue',
			props: {
				quantity: 'fext',
				active: false
			}
		},
		eq1:{
			type: 'EqText',
			props:{
				text:"="
			}
		},
		springCoef: {
			type: 'NewValue',
			props: {
				quantity: 'k',
				active: false
			}
		},
		yVal: {
			type: 'NewValue',
			props: {
				quantity: 'y',
				active: false
			}
		},
		lp1:{
			type: 'EqText',
			props: {
				text: "("
			}
		},
		tVal: {
			type: 'NewValue',
			props: {
				quantity: 't',
				active: false
			}
		},
		rp1: {
			type: 'EqText',
			props: {
				text: ")"
			}
		},
		plus1: {
			type: 'EqText',
			props: {
				text: "+"
			}
		},
		dampCoef: {
			type: 'NewValue',
			props: {
				quantity: 'c',
				active: false
			}
		},
		dydtVal: {
			type: 'NewValue',
			props: {
				quantity: 'dydt',
				active: false
			}
		},
		lp2: {
			type: 'EqText',
			props: {
				text: "("
			}
		},
		tVal1: {
			type: 'NewValue',
			props: {
				quantity: 't',
				active: false
			}
		},
		rp2: {
			type: 'EqText',
			props: {
				text: ")"
			}
		},
		animVal: {
			type: 'NewValue',
			props: {
				quantity: 'animTime',
				active: false
			}
		},
		massPlot: {
			type: 'Plot',
			props: {
				xVar: 's',
				yVar: 'y',
				xVars: ['s','t'],
				yVars: ['y','x'],
				width: 200,
				height: 350,
				pos: {x: 100,y: 400},
				visibility: 1
			},
			children: ['anchor', 'mass', 'spring', 'damper']
		},
		anchor: {
			type: 'Anchor',
			props: {
				xVar: 's',
				yVar: 'x'
			},
			children: []
		},
		mass: {
			type: 'Mass',
			props: {
				xVar: 's',
				yVar: 'y'
			},
			children: []
		},
		spring: {
			type: 'Spring',
			props: {
				xVar1: 's',
				yVar1: 'x',
				xVar2: 's',
				yVar2: 'y'
			},
			children: []
		},
		damper: {
			type: 'Damper',
			props: {
				xVar1: 's',
				yVar1: 'x',
				xVar2: 's',
				yVar2: 'y'
			},
			children: []
		},
		abstraction1: {
			type: "Abstraction",
			props: {
				indVar: "t",
				xVar: "t",
				yVar: "y"
			},
			children: []
		}
	},
	quantities: {
		animTime: {
			value: 0, min: 0, max: 28, symbol: 'dispT', independent: true, abstractions: 10, animation: { playing: false }
		},
		t: { //time
			value: 0,
			min: 0,
			max: 20,
			abstractions: 300,
			independent: true,
			symbol: 't',
			highlighted: false,
			animation: { playing: false }
		},
		imx: { value: 0, min: -10, max: 10, abstractions: 0, independent: false, symbol: 'im(x)', highlighted: false },//imaginary component of x
		x: { value: 0, min: -10, max: 40, abstractions: 0, symbol: 'x', prevPoints: [], highlighted: false }, //real component of x
		y: { value: 0, min: -25, max: 20, symbol: 'y', highlighted: false },//position of mass
		dydt: { value: 0, min: -25, max: 20, symbol: "y'", highlighted: false },
		k: { value: 5, min: 0, max: 100, symbol: 'k', abstractions: 10, independent: true, highlighted: false },//spring constant
		fs: { value: 100, min: -100, max: 100, symbol: <tspan dx={3}>F<tspan fontSize="0.5em" baselineShift="sub">s</tspan></tspan>, independent: false, highlighted: false },
		dl: { value: 10, min: -10, max: 10, symbol: "displacement", independent: false, highlighted: false },
		m: { value: 1, min: 0, max: 30, symbol: 'm', independent: true, highlighted: false },//mass
		c: { value: 0, min: 0, max: 5, symbol: 'c', independent: true, highlighted: false },
		fext: { value: 10, min: -100, max: 100, symbol: <tspan>F<tspan fontSize="0.5em" baselineShift="sub">ext</tspan></tspan>, independent: false, highlighted: false },
		y0: { value: 0, min: -20, max: 20, symbol: <tspan>y<tspan dx="-2" fontSize="0.5em" dy="8">0</tspan></tspan>, independent: true, highlighted: false },//initial mass position
		dy0: { value: 0, min: -20, max: 20, symbol: 'dy0', independent: true, highlighted: false },
		s: { value: 0, min: -6, max: 6, abstractions: 0, symbol: 's', highlighted: false }// lateral position
	}
}

const composeEnhancers = composeWithDevTools({
  // Specify here name, actionsBlacklist, actionsCreators and other options
});

const store = createStore(rootReducer, initialAppState, composeEnhancers(middleware))

store.subscribe(() => { runTests(store.getState()) })

const container = document.getElementById('container')

ReactDOM.render(
	<Provider store={store}>
		<ConnectedRouter history={history}>
      <div>
        <Route path="/" component={SmdApp}/>

      </div>
    </ConnectedRouter>

	</Provider>,
	container
	)



