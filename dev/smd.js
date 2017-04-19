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
   quantities: {
      t: { value: 0, min: 0, max: 40, abstractions: 200, independent: true },
      x: { value: 0, min: 0, max: 10, abstractions: 0 }
   }
};

var store = (0, _redux.createStore)(rootReducer, initialAppState, middleware);

_reactDom2["default"].render(_react2["default"].createElement(
   _reactRedux.Provider,
   { store: store },
   _react2["default"].createElement(_componentsSmdApp2["default"], null)
), document.getElementById('container'));
