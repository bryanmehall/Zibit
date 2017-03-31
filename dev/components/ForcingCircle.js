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

var ForcingCircle = (function (_React$Component) {
  _inherits(ForcingCircle, _React$Component);

  function ForcingCircle() {
    _classCallCheck(this, ForcingCircle);

    _get(Object.getPrototypeOf(ForcingCircle.prototype), "constructor", this).apply(this, arguments);
  }

  _createClass(ForcingCircle, [{
    key: "render",
    value: function render() {
      var xi = this.props.pos.x,
          yi = this.props.pos.y,
          theta = this.props.theta,
          r = this.props.r,
          xo = xi + r * Math.cos(theta),
          yo = yi + r * Math.sin(theta);
      return _react2["default"].createElement(
        "g",
        null,
        _react2["default"].createElement("circle", { //main circle
          r: r,
          cx: xi,
          cy: yi,
          style: { fill: this.props.color.toCss(), stroke: "gray", strokeWidth: "3" }
        }),
        _react2["default"].createElement("circle", { //result point
          r: 5,
          cx: xo,
          cy: yo })
      );
    }
  }]);

  return ForcingCircle;
})(_react2["default"].Component);

exports["default"] = ForcingCircle;
module.exports = exports["default"];
