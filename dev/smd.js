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
         children: ['massPlot']
      },
      massPlot: {
         type: 'Plot',
         props: {
            xVar: 'x',
            yVar: 'x',
            width: 200,
            height: 200,
            pos: { x: 200, y: 400 }
         },
         children: ['abstraction2']
      },

      abstraction1: {
         type: "Abstraction",
         props: {
            indVar: "t",
            xVar: "t",
            yVar: "x"
         },
         children: []
      },
      abstraction2: {
         type: "Abstraction",
         props: {
            indVar: "t",
            xVar: "x",
            yVar: "x"
         },
         children: []
      }

   },
   quantities: {
      t: { value: 0, min: -100, max: 40, abstractions: 200, independent: true, symbol: 't', highlighted: false },
      x: { value: 0, min: -10, max: 10, abstractions: 0, symbol: 'x', highlighted: false }
   }
};

var store = (0, _redux.createStore)(rootReducer, initialAppState, middleware);

_reactDom2["default"].render(_react2["default"].createElement(
   _reactRedux.Provider,
   { store: store },
   _react2["default"].createElement(_componentsSmdApp2["default"], { id: "app" })
), document.getElementById('container'));
