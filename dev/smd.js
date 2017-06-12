"use strict";

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _reduxLogger = require("redux-logger");

var _componentsSmdApp = require("./components/SmdApp");

var _componentsSmdApp2 = _interopRequireDefault(_componentsSmdApp);

var _ducksQuantityActions = require('./ducks/quantity/actions');

var _ducksQuantityActions2 = _interopRequireDefault(_ducksQuantityActions);

var _ducksQuantitySelectors = require('./ducks/quantity/selectors');

var _ducks = require("./ducks");

var reducers = _interopRequireWildcard(_ducks);

var rootReducer = (0, _redux.combineReducers)(reducers);

var animMiddleware = function animMiddleware(store) {
   return function (next) {
      return function (action) {
         if (action.type === 'ANIM_PLAY') {
            var animStart = function animStart() {
               var t = Date.now();
               var name = 't';
               var state = store.getState();
               var initValue = (0, _ducksQuantitySelectors.getValue)(state, name);
               store.dispatch(_ducksQuantityActions2["default"].animStep(name, t, initValue));
            };

            requestAnimationFrame(animStart);
         } else if (action.type === 'ANIM_STEP') {
            var animStep = function animStep() {
               var t0 = action.payload.initTime;
               var v0 = action.payload.initValue;
               var t = Date.now();
               var value = (t - t0) / 1000 + v0;
               var name = action.payload.name;
               var state = store.getState();
               var isPlaying = (0, _ducksQuantitySelectors.getPlaying)(state, name);
               if (isPlaying) {
                  //only update and continue if quantity is still playing
                  store.dispatch(_ducksQuantityActions2["default"].setValue(name, value));
                  store.dispatch(_ducksQuantityActions2["default"].animStep(name, t0, v0));
               }
            };

            requestAnimationFrame(animStep);
         }
         next(action);
      };
   };
};

var middleware = (0, _redux.applyMiddleware)(animMiddleware); //, createLogger())

var initialAppState = {
   widgets: {
      app: {
         type: 'SmdApp',
         props: {},
         children: ['massPlot', 'forcingPlot', 'posPlot', 'eq']
      },
      eq: {
         type: 'Expression',
         props: {
            pos: { x: 50, y: 50 }
         },
         children: ['xVal', 'tVal', 'yVal']
      },
      xVal: {
         type: 'Value',
         props: {
            quantity: 'x',
            active: true
         }
      },
      yVal: {
         type: 'Value',
         props: {
            quantity: 'y0',
            active: false
         }
      },
      tVal: {
         type: 'Value',
         props: {
            quantity: 't',
            active: false
         }
      },
      massPlot: {
         type: 'Plot',
         props: {
            xVar: 's',
            yVar: 'y',
            xVars: ['s', 't'],
            yVars: ['y', 'x'],
            width: 200,
            height: 350,
            pos: { x: 250, y: 400 }
         },
         children: ['anchor', 'mass', 'spring']
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
      posPlot: {
         type: 'Plot',
         props: {
            xVar: 't',
            yVar: 'y',
            xVars: ['t'],
            yVars: ['y'],
            width: 300,
            height: 350,
            pos: { x: 500, y: 400 }
         },
         children: ['abstraction1']
      },
      forcingPlot: {
         type: 'Plot',
         props: {
            xVar: 'x',
            yVar: 'imx',
            xVars: ['x'],
            yVars: ['imx'],
            width: 150,
            height: 150,
            pos: { x: 100, y: 500 }
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
      imx: { value: 0, min: -10, max: 10, abstractions: 0, independent: false, symbol: 'im(x)', highlighted: false }, //imaginary component of x
      x: { value: 0, min: -10, max: 40, abstractions: 0, symbol: 'x', prevPoints: [], highlighted: false }, //real component of x
      y: { value: 0, min: -30, max: 20, symbol: 'y', highlighted: false }, //position of mass
      k: { value: 50, min: 0, max: 100, symbol: 'k', abstractions: 10, independent: true, highlighted: false }, //spring constant
      m: { value: 1, min: 0, max: 30, symbol: 'm', independent: true, highlighted: false }, //mass
      c: { value: 0, min: 0, max: 30, symbol: 'c', independent: true, highlighted: false },
      y0: { value: 0, min: -20, max: 20, symbol: _react2["default"].createElement(
            "tspan",
            null,
            "y",
            _react2["default"].createElement(
               "tspan",
               { dx: "-2", fontSize: "0.5em", dy: "8" },
               "0"
            )
         ), independent: true, highlighted: false }, //initial mass position
      dy0: { value: 0, min: -20, max: 20, symbol: 'dy0', independent: true, highlighted: false },
      s: { value: 0, min: -10, max: 10, abstractions: 0, symbol: 's', highlighted: false } // lateral position
   }
};

var store = (0, _redux.createStore)(rootReducer, initialAppState, middleware);

_reactDom2["default"].render(_react2["default"].createElement(
   _reactRedux.Provider,
   { store: store },
   _react2["default"].createElement(_componentsSmdApp2["default"], { id: "app" })
), document.getElementById('container'));
