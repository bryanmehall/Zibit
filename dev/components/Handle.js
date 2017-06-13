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

var _ducksWidgetActions = require('../ducks/widget/actions');

var _ducksWidgetActions2 = _interopRequireDefault(_ducksWidgetActions);

var _ducksQuantitySelectors = require('../ducks/quantity/selectors');

var _Draggable = require("./Draggable");

var _Draggable2 = _interopRequireDefault(_Draggable);

var Handle = (function (_React$Component) {
   _inherits(Handle, _React$Component);

   function Handle(props) {
      _classCallCheck(this, Handle);

      _get(Object.getPrototypeOf(Handle.prototype), "constructor", this).call(this, props);
      this.dragStart = this.dragStart.bind(this);
      this.dragMove = this.dragMove.bind(this);
      this.dragEnd = this.dragEnd.bind(this);
   }

   _createClass(Handle, [{
      key: "dragStart",
      value: function dragStart(initPos) {
         this.isPlaying = this.props.playing;
         this.props.setPlay(this.props.quantity, false);
         this.startOffset = this.props.pos.x - initPos.x; //offset in px
      }
   }, {
      key: "dragMove",
      value: function dragMove(newPos) {
         var newPos = newPos.x + this.startOffset;
         this.props.setTransformedValue(this.props.quantity, newPos, this.props.scale);
      }
   }, {
      key: "dragEnd",
      value: function dragEnd(endPos) {
         console.log('end');
         this.props.setPlay('animTime', this.isPlaying);
      }
   }, {
      key: "render",
      value: function render() {
         var pos = this.props.pos;
         var color = this.props.color || "#ddd";
         return _react2["default"].createElement(
            _Draggable2["default"],
            { dragStart: this.dragStart, dragMove: this.dragMove, dragEnd: this.dragEnd },
            _react2["default"].createElement("circle", { cx: pos.x, cy: pos.y, r: 7, fill: color, stroke: "#666" })
         );
      }
   }]);

   return Handle;
})(_react2["default"].Component);

function mapStateToProps(state, props) {
   var br = props.boundingRect;
   var scale = (0, _ducksQuantitySelectors.getScale)(state, props.quantity, props.min, props.max);
   return {
      pos: {
         x: (0, _ducksQuantitySelectors.getTransformedValue)(state, props.quantity, scale),
         y: props.y
      },
      scale: scale,
      playing: (0, _ducksQuantitySelectors.getPlaying)(state, props.quantity)

   };
}

function mapDispatchToProps(dispatch) {
   return {
      setTransformedValue: function setTransformedValue(quantity, value, scale) {
         dispatch(_ducksQuantityActions2["default"].setValueFromCoords(quantity, value, scale));
      },
      setValue: function setValue(name, value) {
         dispatch(_ducksQuantityActions2["default"].setValue(name, value));
      },
      setActive: function setActive(name, value) {
         dispatch(_ducksWidgetActions2["default"].setActive(name, value));
      },
      setPlay: function setPlay(name, value) {
         dispatch(_ducksQuantityActions2["default"].setPlay(name, value));
      }
   };
}

exports["default"] = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Handle);
module.exports = exports["default"];
