"use strict";

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _reduxLogger = require("redux-logger");

var _componentsSlider = require("./components/Slider");

var _componentsSlider2 = _interopRequireDefault(_componentsSlider);

var _componentsScale = require("./components/Scale");

var _componentsScale2 = _interopRequireDefault(_componentsScale);

var _componentsSmdApp = require("./components/SmdApp");

var _componentsSmdApp2 = _interopRequireDefault(_componentsSmdApp);

var _actionsQuantity = require('./actions/quantity');

var QuantityActions = _interopRequireWildcard(_actionsQuantity);

//reducers/quantity.js
var quantityReducer = function quantityReducer(state, action) {
   if (state === undefined) state = { value: 0, selected: false, min: 0, max: 1, independent: false, abstractions: 0 };

   //here state refers to an individual quantity object
   switch (action.type) {
      case 'SET_VALUE':
         {
            return Object.assign({}, state, { value: action.payload.value });
            break;
         }
      case 'SELECT':
         {
            return Object.assign({}, state, { selected: true });
            break;
         }
   }
   return state;
};

var quantitiesReducer = function quantitiesReducer(state, action) {
   if (state === undefined) state = {};

   //here state refers to quantities object of state tree
   switch (action.type) {
      case 'SET_VALUE':
         {
            var name = action.payload.name;
            return Object.assign({}, state, _defineProperty({}, name, quantityReducer(state[name], action)));
            break;
         }
      case 'SELECT':
         {
            var name = action.payload.name;
            return Object.assign({}, state, _defineProperty({}, name, quantityReducer(state[name], action)));
            break;
         }
   }
   return state;
};

//reducers/index.js
var reducers = (0, _redux.combineReducers)({
   quantities: quantitiesReducer
});

var middleware = (0, _redux.applyMiddleware)((0, _reduxLogger.createLogger)());
var initialAppState = {
   quantities: {
      t: {}

   }
};

var store = (0, _redux.createStore)(reducers, initialAppState, middleware);

store.dispatch({ type: 'SET_VALUE', payload: { name: 't', value: 20 } });
store.dispatch({ type: 'SELECT', payload: { name: 't' } });
store.dispatch({ type: 'SET_VALUE', payload: { name: 't', value: 40 } });

_reactDom2["default"].render(_react2["default"].createElement(
   _reactRedux.Provider,
   { store: store },
   _react2["default"].createElement(_componentsSmdApp2["default"], null)
), document.getElementById('container'));
