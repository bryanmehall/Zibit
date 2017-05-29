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

var _ducks = require("./ducks");

var reducers = _interopRequireWildcard(_ducks);

var rootReducer = (0, _redux.combineReducers)(reducers);

var middleware = (0, _redux.applyMiddleware)((0, _reduxLogger.createLogger)());

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
            quantity: 'y',
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
         children: ['mass', 'spring']
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
            yVars: ['x'],
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
            yVar: "x"
         },
         children: []
      }
   },
   quantities: {
      t: { //time
         value: 0,
         min: 0,
         max: 40,
         abstractions: 200,
         independent: true,
         symbol: 't',
         highlighted: false,
         animation: { playing: false }
      },
      imx: { value: 0, min: -10, max: 10, abstractions: 0, independent: false, symbol: 'im(x)', highlighted: false }, //imaginary component of x
      x: { value: 0, min: -10, max: 40, abstractions: 0, symbol: 'xx', highlighted: false }, //real component of x
      y: { value: 0, min: -30, max: 20, symbol: 'yyy', highlighted: false }, //position of mass
      k: { value: 50, min: 0, max: 100, symbol: 'k', abstractions: 10, independent: true, highlighted: false }, //spring constant
      m: { value: 1, min: 0, max: 30, symbol: 'm', independent: true, highlighted: false }, //mass
      y0: { value: 0, min: -20, max: 20, symbol: 'y0', independent: true, highlighted: false }, //initial mass position
      s: { value: 0, min: -10, max: 10, abstractions: 0, symbol: 's', highlighted: false } // lateral position
   }
};

var store = (0, _redux.createStore)(rootReducer, initialAppState, middleware);

_reactDom2["default"].render(_react2["default"].createElement(
   _reactRedux.Provider,
   { store: store },
   _react2["default"].createElement(_componentsSmdApp2["default"], { id: "app" })
), document.getElementById('container'));
