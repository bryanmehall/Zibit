'use strict';

Object.defineProperty(exports, '__esModule', {
   value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Scale = require('./Scale');

var _Scale2 = _interopRequireDefault(_Scale);

var _Axis = require('./Axis');

var _Axis2 = _interopRequireDefault(_Axis);

var Plot = (function (_React$Component) {
   _inherits(Plot, _React$Component);

   function Plot() {
      _classCallCheck(this, Plot);

      _get(Object.getPrototypeOf(Plot.prototype), 'constructor', this).apply(this, arguments);
   }

   _createClass(Plot, [{
      key: 'render',
      value: function render() {
         var width = this.props.width,
             //width in px from axis min
         height = this.props.height,
             //height in px from axis min
         pos = this.props.pos,
             xQuantity = this.props.xQuantity,
             //state object of x quantity
         yQuantity = this.props.yQuantity; //state object of y quantity
         var xScale = new _Scale2['default']({
            min: xQuantity.min,
            max: xQuantity.max,
            tMin: pos.x,
            tMax: pos.x + width
         });
         var yScale = new _Scale2['default']({
            min: yQuantity.min,
            max: yQuantity.max,
            tMin: pos.y,
            tMax: pos.y - height
         });
         return _react2['default'].createElement(
            'g',
            null,
            _react2['default'].createElement(_Axis2['default'], { scale: xScale, pos: pos.y }),
            _react2['default'].createElement(_Axis2['default'], { scale: yScale, pos: pos.x, vertical: true })
         );
      }
   }]);

   return Plot;
})(_react2['default'].Component);

exports['default'] = Plot;
module.exports = exports['default'];
