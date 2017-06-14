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

var Animation = (function (_React$Component) {
   _inherits(Animation, _React$Component);

   function Animation() {
      _classCallCheck(this, Animation);

      _get(Object.getPrototypeOf(Animation.prototype), "constructor", this).apply(this, arguments);
   }

   _createClass(Animation, [{
      key: "render",
      value: function render() {
         var onPlay = this.props.onPlay;
         var onPause = this.props.onPause;
         var pos = this.props.pos;
         var scale = this.props.scale || 0.8;
         var color = this.props.color || 'gray';
         var self = this;
         var pause = "M0,0 L9,5 9,15 0,20 M9,5 L18,10 18,10 9,15";
         var play = "M0,0 L7,0 7,20 0,20 M11,0 L18,0 18,20 11,20";
         var fromPath = this.props.wasPlaying ? pause : play;
         var toPath = this.props.wasPlaying ? play : pause;
         //why does the button not change when paused externally?
         //We'll call it a feature...
         return _react2["default"].createElement(
            "path",
            {
               transform: 'matrix(' + scale + ' 0 0 ' + scale + ' ' + pos.x + ' ' + pos.y + ')',
               d: toPath,
               pointerEvents: "bounding-box",
               fill: color,
               onClick: function () {
                  if (!self.props.wasPlaying) {
                     if (typeof onPlay === 'function') {
                        onPlay();
                     }
                  } else {
                     if (typeof onPause === 'function') {
                        onPause();
                     }
                  }
                  self.props.setPlay(self.props.quantity, !self.props.wasPlaying);
               }
            },
            _react2["default"].createElement("animate", {
               from: fromPath,
               to: toPath,
               begin: "click",
               attributeType: "XML",
               attributeName: "d",
               fill: "freeze",
               keySplines: ".4 0 1 1",
               repeatCount: "1",
               dur: ".2s"
            })
         );
      }
   }]);

   return Animation;
})(_react2["default"].Component);

function mapStateToProps(state, props) {
   var quantityData = (0, _ducksQuantitySelectors.getQuantityData)(state, props.quantity);
   return {
      wasPlaying: (0, _ducksQuantitySelectors.getPlaying)(state, props.quantity),
      value: (0, _ducksQuantitySelectors.getValue)(state, props.quantity)

   };
}

function mapDispatchToProps(dispatch) {
   return {
      setHighlight: function setHighlight(name, value) {
         dispatch(_ducksQuantityActions2["default"].setHighlight(name, value));
      },
      setActive: function setActive(name, value) {
         dispatch(WidgetActions.setActive(name, value));
      },
      setPlay: function setPlay(name, value) {
         dispatch(_ducksQuantityActions2["default"].setPlay(name, value));
      },
      setValue: function setValue(name, value) {
         dispatch(_ducksQuantityActions2["default"].setValue(name, value));
      }
   };
}

exports["default"] = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Animation);
module.exports = exports["default"];
