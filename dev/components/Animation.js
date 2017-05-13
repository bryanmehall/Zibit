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

var Animation = (function (_React$Component) {
   _inherits(Animation, _React$Component);

   function Animation(props) {
      _classCallCheck(this, Animation);

      _get(Object.getPrototypeOf(Animation.prototype), "constructor", this).call(this, props);
   }

   _createClass(Animation, [{
      key: "render",
      value: function render() {
         console.log('play', this.props.playing);
         var self = this;
         var pause = "M11,10 L18,13.74 18,22.28 11,26 M18,13.74 L26,18 26,18 18,22.28";
         var play = "M11,10 L17,10 17,26 11,26 M20,10 L26,10 26,26 20,26";
         var fromPath = this.props.playing ? pause : play;
         var toPath = this.props.playing ? play : pause;
         console.log(fromPath);
         return _react2["default"].createElement(
            "path",
            {
               d: toPath,
               pointerEvents: "bounding-box",
               fill: "gray",
               onClick: function () {
                  self.props.onClick(!self.props.playing);
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

exports["default"] = Animation;
module.exports = exports["default"];
