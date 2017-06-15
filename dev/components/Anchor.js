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

var _Draggable = require("./Draggable");

var _Draggable2 = _interopRequireDefault(_Draggable);

var Anchor = (function (_React$Component) {
   _inherits(Anchor, _React$Component);

   function Anchor(props) {
      _classCallCheck(this, Anchor);

      _get(Object.getPrototypeOf(Anchor.prototype), "constructor", this).call(this, props);
      this.dragStart = this.dragStart.bind(this);
      this.dragMove = this.dragMove.bind(this);
      this.dragEnd = this.dragEnd.bind(this);
   }

   _createClass(Anchor, [{
      key: "dragStart",
      value: function dragStart(initPos) {
         this.startOffset = this.props.pos.y - initPos.y; //offset in px
         this.props.setX0(this.startOffset, this.props.coordSys.yScale);
      }
   }, {
      key: "dragMove",
      value: function dragMove(newPos) {
         var newYPos = newPos.y + this.startOffset;
         this.props.setX0(newYPos, this.props.coordSys.yScale);
      }
   }, {
      key: "dragEnd",
      value: function dragEnd(endPos) {
         this.props.setPlay('t', true);
      }
   }, {
      key: "render",
      value: function render() {
         var pos = this.props.pos;
         var width = 80;
         var height = 15;
         var maskString = 'url(#' + this.props.mask + ')';
         return _react2["default"].createElement(
            _Draggable2["default"],
            { dragStart: this.dragStart, dragMove: this.dragMove, dragEnd: this.dragEnd },
            _react2["default"].createElement(
               "g",
               null,
               _react2["default"].createElement("rect", { x: pos.x, y: 0, width: width, height: pos.y + height, mask: maskString, fill: "none", cursor: "grab" }),
               _react2["default"].createElement(
                  "pattern",
                  { id: "diagonalHatch", patternUnits: "userSpaceOnUse", viewBox: "0 0 8 8", width: "8", height: "8" },
                  _react2["default"].createElement("path", { d: "M-2,2 l4,-4 M0,8 l8,-8 M6,10 l4,-4",
                     style: { stroke: 'black', strokeWidth: 1 } })
               ),
               _react2["default"].createElement("rect", { x: pos.x, y: pos.y, width: width, height: height, mask: maskString, fill: "url(#diagonalHatch)" }),
               _react2["default"].createElement("line", { x1: pos.x, x2: pos.x + width, y1: pos.y, y2: pos.y, stroke: "black", strokeWidth: 1.5 })
            )
         );
      }
   }]);

   return Anchor;
})(_react2["default"].Component);

function mapStateToProps(state, props) {
   var br = props.boundingRect;
   var coordSys = (0, _ducksQuantitySelectors.getCoordSys)(state, props.xVar, props.yVar, br);
   return {
      pos: {
         x: (0, _ducksQuantitySelectors.getTransformedValue)(state, props.xVar, coordSys.xScale),
         y: (0, _ducksQuantitySelectors.getTransformedValue)(state, props.yVar, coordSys.yScale)
      }

   };
}

function mapDispatchToProps(dispatch) {
   return {
      setX0: function setX0(value, scale) {
         dispatch(_ducksQuantityActions2["default"].setValueFromCoords('x', value, scale));
      },
      setValue: function setValue(name, value) {
         dispatch(_ducksQuantityActions2["default"].setValue(name, value));
      },
      setPlay: function setPlay(name, value) {
         dispatch(_ducksQuantityActions2["default"].setPlay(name, value));
      }
   };
}

exports["default"] = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Anchor);
module.exports = exports["default"];