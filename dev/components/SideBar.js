"use strict";

Object.defineProperty(exports, "__esModule", {
   value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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

var _anim = require('../anim');

var _ducksQuantitySelectors = require('../ducks/quantity/selectors');

var _Animation = require("./Animation");

var _Animation2 = _interopRequireDefault(_Animation);

var _InfoBar = require("./InfoBar");

var _InfoBar2 = _interopRequireDefault(_InfoBar);

var _Handle = require("./Handle");

var _Handle2 = _interopRequireDefault(_Handle);

var SideBar = (function (_React$Component) {
   _inherits(SideBar, _React$Component);

   function SideBar(props) {
      _classCallCheck(this, SideBar);

      _get(Object.getPrototypeOf(SideBar.prototype), "constructor", this).call(this, props);
      this.onDragStart = this.onDragStart.bind(this);
      //this.onDragMove = this.dragMove.bind(this)
      this.onDragEnd = this.onDragEnd.bind(this);
   }

   _createClass(SideBar, [{
      key: "onDragStart",
      value: function onDragStart(props, initVal) {
         this.isPlaying = this.props.playing;
         console.log(this.isPlaying);
         this.props.setPlay('animTime', false);
         _anim.audio.pause();
      }
   }, {
      key: "onDragEnd",
      value: function onDragEnd(props, endVal) {
         if (this.isPlaying) {
            _anim.audio.play();
         }
         console.log(this.isPlaying);
         this.props.setPlay('animTime', this.isPlaying);
      }
   }, {
      key: "onPlay",
      value: function onPlay() {
         _anim.audio.play();
      }
   }, {
      key: "onPause",
      value: function onPause() {
         _anim.audio.pause();
      }
   }, {
      key: "render",
      value: function render() {
         var width = 300;
         var height = 80;
         var titleFontSize = 15;
         var color = '#eee';
         var textStyle = {
            fontSize: titleFontSize,
            textAnchor: "middle",
            x: (width + 50) / 2,
            fill: color

         };
         var sideBarStyle = {
            width: width + 'px',
            fontFamily: "helvetica",
            fontSize: 15

         };

         return _react2["default"].createElement(
            "div",
            { style: sideBarStyle },
            _react2["default"].createElement(
               "svg",
               {
                  width: width,
                  height: height
               },
               _react2["default"].createElement("rect", {
                  width: width,
                  height: height,
                  fill: "#666" }),
               _react2["default"].createElement(
                  "text",
                  _extends({}, textStyle, {
                     y: 20 }),
                  "Part 01:"
               ),
               _react2["default"].createElement(
                  "text",
                  _extends({}, textStyle, {
                     y: 20 + titleFontSize + 5 }),
                  "Simple Harmonic Oscillator"
               ),
               _react2["default"].createElement(_Animation2["default"], {
                  pos: { x: 10, y: 9 },
                  quantity: "animTime",
                  scale: 1.6,
                  color: color,
                  onPlay: this.onPlay,
                  onPause: this.onPause
               }),
               _react2["default"].createElement("line", {
                  x1: 15,
                  x2: width - 15,
                  y1: height - 15,
                  y2: height - 15,
                  stroke: color,
                  strokeWidth: 3,
                  strokeLinecap: "round"
               }),
               _react2["default"].createElement(_Handle2["default"], {
                  quantity: "animTime",
                  y: height - 15,
                  min: 15,
                  max: width - 15,
                  onDragEnd: this.onDragEnd,
                  onDragStart: this.onDragStart
               })
            ),
            _react2["default"].createElement(
               "div",
               { style: { overflow: "auto", backgroundColor: color, height: 1000, margin: "0px" } },
               _react2["default"].createElement(_InfoBar2["default"], null)
            )
         );
      }
   }]);

   return SideBar;
})(_react2["default"].Component);

function mapStateToProps(state, props) {
   var br = props.boundingRect;
   return {
      playing: (0, _ducksQuantitySelectors.getPlaying)(state, 'animTime')
   };
}

function mapDispatchToProps(dispatch) {
   return {
      setY0: function setY0(value) {
         dispatch(_ducksQuantityActions2["default"].setValue('y0', value));
      },
      setPlay: function setPlay(name, value) {
         dispatch(_ducksQuantityActions2["default"].setPlay(name, value));
      }
   };
}

exports["default"] = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(SideBar);
module.exports = exports["default"];
