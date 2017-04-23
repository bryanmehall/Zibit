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

var _Slider = require('./Slider');

var _Slider2 = _interopRequireDefault(_Slider);

var _reactRedux = require("react-redux");

var _redux = require('redux');

var _ducksQuantityActions = require('../ducks/quantity/actions');

var _ducksQuantityActions2 = _interopRequireDefault(_ducksQuantityActions);

var _ducksQuantitySelectors = require('../ducks/quantity/selectors');

var Value = (function (_React$Component) {
   _inherits(Value, _React$Component);

   function Value(props) {
      _classCallCheck(this, Value);

      _get(Object.getPrototypeOf(Value.prototype), "constructor", this).call(this, props);
      this.mouseOver = this.mouseOver.bind(this);
      this.mouseOut = this.mouseOut.bind(this);
      this.textStyle = {
         fontStyle: "italic",
         fontFamily: 'MathJax_Main,"Times New Roman",Times,serif',
         fontSize: "1.6em",
         WebkitTouchCallout: "none",
         WebkitUserSelect: "none",
         MozUserSelect: "none"
      };
   }

   _createClass(Value, [{
      key: "mouseOver",
      value: function mouseOver() {
         this.props.setHighlight(this.props.quantity, true);
      }
   }, {
      key: "mouseOut",
      value: function mouseOut() {
         this.props.setHighlight(this.props.quantity, false);
      }
   }, {
      key: "componentWillMount",
      value: function componentWillMount() {
         var dummyElement = document.createElementNS('http://www.w3.org/2000/svg', 'text');
         dummyElement.textContent = this.props.symbol;
         dummyElement.style = "font-style: italic; font-family:'MathJax_Main,Times,serif'; font-size:1.6em;";
         document.getElementById('hiddenSvg').appendChild(dummyElement);
         var width = dummyElement.getBBox().width;
         this.props.getWidth(width, this.props.index);
      }
   }, {
      key: "render",
      value: function render() {
         var filter = this.props.highlighted ? "url(#highlight)" : null;
         var text = _react2["default"].createElement(
            "text",
            {
               style: this.textStyle,
               x: this.props.pos.x,
               y: this.props.pos.y,
               ref: "text",
               filter: filter,
               onMouseOver: this.mouseOver,
               onMouseOut: this.mouseOut
            },
            this.props.symbol
         );
         var overlay = _react2["default"].createElement("g", null);

         if (this.props.selected) {
            return _react2["default"].createElement(
               "g",
               null,
               text,
               overlay
            );
         } else {
            return text;
         }
      }
   }]);

   return Value;
})(_react2["default"].Component);

function mapStateToProps(state, props) {
   var quantityData = (0, _ducksQuantitySelectors.getQuantityData)(state, props.quantity);
   return {
      symbol: quantityData.symbol,
      independent: quantityData.independent,
      highlighted: quantityData.highlighted
   };
}

function mapDispatchToProps(dispatch) {
   return {
      setHighlight: function setHighlight(name, value) {
         dispatch(_ducksQuantityActions2["default"].setHighlight(name, value));
      }
   };
}

exports["default"] = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Value);
module.exports = exports["default"];
