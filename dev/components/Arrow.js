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

var _Path = require('./Path');

var _Path2 = _interopRequireDefault(_Path);

var Arrow = (function (_React$Component) {
   _inherits(Arrow, _React$Component);

   function Arrow(props) {
      _classCallCheck(this, Arrow);

      _get(Object.getPrototypeOf(Arrow.prototype), "constructor", this).call(this, props);
      this.dragStart = this.dragStart.bind(this);
      this.dragMove = this.dragMove.bind(this);
      this.dragEnd = this.dragEnd.bind(this);
   }

   _createClass(Arrow, [{
      key: "dragStart",
      value: function dragStart(initPos) {
         //this.startOffset = this.props.pos.y-initPos.y //offset in px
         //this.props.setX0(this.startOffset, this.props.coordSys.yScale)
      }
   }, {
      key: "dragMove",
      value: function dragMove(newPos) {
         //var newYPos = newPos.y+this.startOffset
         //this.props.setX0(newYPos, this.props.coordSys.yScale)
      }
   }, {
      key: "dragEnd",
      value: function dragEnd(endPos) {}
   }, {
      key: "render",
      value: function render() {
         var magnitude = this.props.magnitude || 10;
         var angle = this.props.angle || 90;
         var dx = this.props.dx || Math.cos(angle) * magnitude;
         var dy = this.props.dy || Math.sin(angle) * magnitude;
         var tail = { x: 100, y: 100 };
         console.log(this.props.tail, tail);
         var tip = this.props.tip || { x: tail.x + dx, y: tail.y + dy };
         var maskString = 'url(#' + this.props.mask + ')';
         var arrowPath = calcArrow(tail, tip, 10);
         var transform = 'translate(' + tail.x + ',' + tail.y + ') rotate(' + angle + ',' + tail.x + ',' + tail.y + ')';

         return _react2["default"].createElement(_Path2["default"], { points: arrowPath, transform: transform, fill: "rgba(255,0,0,0.6)", strokeWidth: "0" });
      }
   }]);

   return Arrow;
})(_react2["default"].Component);

function calcArrow(tail, tip, w, tw, ar) {
   //tailPosition, tipPosition, width of arrow,width of tip, tipWidth/tipLength
   var dx = tip.x - tail.x;
   var dy = tip.y - tail.y;
   var l = Math.sqrt(dx * dx + dy * dy);
   ar = ar || Math.sqrt(3);
   tw = tw || 2 * w;
   if (l < tw / ar) {
      tw = l * ar;
   }
   var tipL = tw / ar;

   return [{ x: 0, y: -w / 2 }, { x: l - tipL, y: -w / 2 }, { x: l - tipL, y: -tw / 2 }, { x: l, y: 0 }, { x: l - tipL, y: tw / 2 }, { x: l - tipL, y: w / 2 }, { x: 0, y: w / 2 }];
}

function mapStateToProps(state, props) {
   var br = props.boundingRect;
   var quantity = props.quantity; //defaults to y
   var xQuantity = props.xQuantity || quantity;
   var coordSys = (0, _ducksQuantitySelectors.getCoordSys)(state, xQuantity, quantity, br);
   return {
      /*pos:{
      	x:getTransformedValue(state, props.xVar, coordSys.xScale),
      	y:getTransformedValue(state, props.yVar, coordSys.yScale)
      },*/
      magnitude: (0, _ducksQuantitySelectors.getTransformedValue)(state, quantity, coordSys.yScale)

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

exports["default"] = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Arrow);
module.exports = exports["default"];
