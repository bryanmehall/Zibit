'use strict';

Object.defineProperty(exports, '__esModule', {
   value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Axis = require('./Axis');

var _Axis2 = _interopRequireDefault(_Axis);

var _Scale = require('./Scale');

var _Scale2 = _interopRequireDefault(_Scale);

var Slider = (function (_React$Component) {
   _inherits(Slider, _React$Component);

   //properties

   function Slider(props) {
      _classCallCheck(this, Slider);

      _get(Object.getPrototypeOf(Slider.prototype), 'constructor', this).call(this, props);
      this.width = 150;
      this.mouseDown = this.mouseDown.bind(this);
      this.pxPerUnit = this.width / (this.scale.max - this.scale.min);
   }

   _createClass(Slider, [{
      key: 'mouseDown',
      value: function mouseDown(e) {
         var slider = this;
         var prevVal = this.props.value;
         //mouse difference in units
         var mouseError = slider.scale.invert(e.clientX) - prevVal;

         var mouseMove = function mouseMove(e) {
            e.preventDefault();
            document.addEventListener('mouseup', mouseUp);
            var newValue = clamp(slider.scale.invert(e.clientX) - mouseError, slider.scale.min, slider.scale.max);
            slider.props.valueChange(newValue);
         };
         var mouseUp = function mouseUp(e) {
            document.removeEventListener('mousemove', mouseMove);
         };

         document.addEventListener('mousemove', mouseMove);
         function clamp(val, min, max) {
            if (val < min) {
               return min;
            } else if (val > max) {
               return max;
            } else {
               return val;
            }
         }
      }
   }, {
      key: 'render',
      value: function render() {
         var scale = new _Scale2['default']({
            min: quantity.min,
            max: quantity.max,
            tMin: 0,
            tMax: this.width
         });
         var handleStyle = {
            "strokeWidth": "2",
            "stroke": "gray",
            "fill": "white",
            "cursor": "move"
         };
         var barStyle = {
            "strokeWidth": "8",
            "stroke": "white",
            "strokeLinecap": "round"
         };
         var highlightStyle = {
            "strokeWidth": "12",
            "stroke": "gray",
            "strokeLinecap": "round"
         };
         var pos = this.props.pos;
         var scale = this.scale;
         return _react2['default'].createElement(
            'g',
            null,
            _react2['default'].createElement('line', {
               style: highlightStyle,
               x1: scale.tMin,
               x2: scale.tMax,
               y1: pos,
               y2: pos
            }),
            _react2['default'].createElement('line', {
               style: barStyle,
               x1: scale.tMin,
               x2: scale.tMax,
               y1: pos,
               y2: pos
            }),
            _react2['default'].createElement('circle', {
               style: handleStyle,
               ref: 'handle',
               onMouseDown: this.mouseDown,
               cx: this.scale.transform(this.props.value),
               cy: pos,
               r: 9
            }),
            _react2['default'].createElement(_Axis2['default'], { scale: scale, pos: pos, showBar: false })
         );
      }
   }]);

   return Slider;
})(_react2['default'].Component);

exports['default'] = Slider;
module.exports = exports['default'];
