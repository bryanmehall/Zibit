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

var Axis = (function (_React$Component) {
   _inherits(Axis, _React$Component);

   function Axis() {
      _classCallCheck(this, Axis);

      _get(Object.getPrototypeOf(Axis.prototype), 'constructor', this).apply(this, arguments);
   }

   _createClass(Axis, [{
      key: 'render',
      value: function render() {
         var axis = this;
         var scale = this.props.scale;
         var width = scale.tMax - scale.tMin;
         var showBar = this.props.showBar || true;
         var tickValues = tickValues(scale);
         var ticks = tickValues.map(drawTick);
         function drawTick(value, i) {
            var loc = scale.transform(value);
            return _react2['default'].createElement(
               'text',
               {
                  key: i,
                  x: loc,
                  y: axis.props.pos + 25,
                  textAnchor: 'middle'
               },
               value
            );
         }
         //define base line
         var lineStyle = {
            "strokeWidth": 1.8,
            "stroke": "black",
            "strokeLinecap": "round"
         };
         var baseline;
         if (this.props.vertical) {
            baseline = _react2['default'].createElement('line', null);
         } else {
            baseline = _react2['default'].createElement('line', {
               style: lineStyle,
               x1: scale.tMin,
               x2: scale.tMax,
               y1: this.props.pos,
               y2: this.props.pos
            });
         }
         if (this.props.showBar) {
            return _react2['default'].createElement(
               'g',
               null,
               baseline,
               ticks
            );
         } else {
            return _react2['default'].createElement(
               'g',
               null,
               ticks
            );
         }

         function tickValues(scale) {
            var spacing = tickSpacing(scale);
            var minTick = Math.floor(scale.min / spacing) * spacing;
            var values = [];
            var value = minTick;
            while (value <= scale.max) {
               values.push(value);
               value += spacing;
            }
            return values;

            function tickSpacing(scale) {
               var minInt = 5;
               var range = scale.max - scale.min;
               var niceRange = Math.pow(10.0, Math.floor(Math.log10(range)));
               if (range / niceRange >= 5) {
                  //spacing 10*10^n
                  return niceRange;
               } else if (range / (niceRange / 2.0) >= 5) {
                  return niceRange / 2.0; //spacing 5*10^n
               } else {
                     return niceRange / 5.0; //spacing 2*10^n
                  }
            }
         }
      }
   }]);

   return Axis;
})(_react2['default'].Component);

exports['default'] = Axis;
module.exports = exports['default'];