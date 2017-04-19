"use strict";

Object.defineProperty(exports, "__esModule", {
   value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

var _redux = require('redux');

var _Path = require("./Path");

var _Path2 = _interopRequireDefault(_Path);

var _ducksQuantityActions = require('../ducks/quantity/actions');

var QuantityActions = _interopRequireWildcard(_ducksQuantityActions);

var _ducksQuantitySelectors = require('../ducks/quantity/selectors');

var Abstraction = (function (_React$Component) {
   _inherits(Abstraction, _React$Component);

   function Abstraction() {
      _classCallCheck(this, Abstraction);

      _get(Object.getPrototypeOf(Abstraction.prototype), "constructor", this).apply(this, arguments);
   }

   _createClass(Abstraction, [{
      key: "render",
      value: function render() {

         var points = this.props.points;
         return _react2["default"].createElement(_Path2["default"], {
            points: points,
            coordSys: this.props.coordSys,
            clipPath: this.props.clipPath
         });
      }
   }]);

   return Abstraction;
})(_react2["default"].Component);

function mapStateToProps(state, props) {
   return {
      points: (0, _ducksQuantitySelectors.getAbsPoints)(state, props.indVar, props.xVar, props.yVar)
   };
}

function mapDispatchToProps(dispatch) {
   return {
      actions: (0, _redux.bindActionCreators)(QuantityActions, dispatch)
   };
}

exports["default"] = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Abstraction);
module.exports = exports["default"];