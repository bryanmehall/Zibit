"use strict";

Object.defineProperty(exports, "__esModule", {
   value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

var _redux = require('redux');

var _ducksQuantityActions = require('../ducks/quantity/actions');

var _ducksQuantityActions2 = _interopRequireDefault(_ducksQuantityActions);

var _ducksQuantitySelectors = require('../ducks/quantity/selectors');

var _Animation = require("./Animation");

var _Animation2 = _interopRequireDefault(_Animation);

var InfoBar = (function (_React$Component) {
   _inherits(InfoBar, _React$Component);

   function InfoBar() {
      _classCallCheck(this, InfoBar);

      _get(Object.getPrototypeOf(InfoBar.prototype), "constructor", this).apply(this, arguments);
   }

   _createClass(InfoBar, [{
      key: "render",
      value: function render() {
         return _react2["default"].createElement(
            "div",
            null,
            _react2["default"].createElement(
               "div",
               null,
               "header"
            ),
            _react2["default"].createElement(
               "div",
               null,
               "body"
            )
         );
      }
   }]);

   return InfoBar;
})(_react2["default"].Component);

function mapStateToProps(state, props) {
   var br = props.boundingRect;
   return {};
}

function mapDispatchToProps(dispatch) {
   return {
      setY0: function setY0(value) {
         dispatch(_ducksQuantityActions2["default"].setValue('y0', value));
      }
   };
}

exports["default"] = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(InfoBar);
module.exports = exports["default"];
