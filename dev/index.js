"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _componentsAxis = require('./components/Axis');

var _componentsAxis2 = _interopRequireDefault(_componentsAxis);

var _componentsScale = require('./components/Scale');

var _componentsScale2 = _interopRequireDefault(_componentsScale);

var _componentsSlider = require('./components/Slider');

var _componentsSlider2 = _interopRequireDefault(_componentsSlider);

var App = (function (_React$Component) {
   _inherits(App, _React$Component);

   function App(props) {
      _classCallCheck(this, App);

      _get(Object.getPrototypeOf(App.prototype), "constructor", this).call(this, props);
      this.state = { t: 30 };
   }

   _createClass(App, [{
      key: "render",
      value: function render() {
         var scale = new _componentsScale2["default"]({ min: -10, max: 500, tMin: 100, tMax: 300 });
         var app = this;
         var valueChange = function valueChange(value) {
            app.setState({ t: value.value });
         };
         return _react2["default"].createElement(
            "svg",
            { height: 400, width: 400 },
            _react2["default"].createElement(_componentsAxis2["default"], { scale: scale, pos: 100, showBar: true }),
            _react2["default"].createElement(_componentsSlider2["default"], {
               scale: scale,
               value: this.state.t,
               pos: 20,
               valueChange: valueChange })
         );
      }
   }]);

   return App;
})(_react2["default"].Component);

_reactDom2["default"].render(_react2["default"].createElement(App, null), document.getElementById('container'));