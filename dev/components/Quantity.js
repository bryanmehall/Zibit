'use strict';

Object.defineProperty(exports, '__esModule', {
   value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _Scale = require('./Scale');

var _Scale2 = _interopRequireDefault(_Scale);

function Quantity() {
   this.value = 10;
   this.scale = new _Scale2['default']();
}

exports['default'] = Quantity;
module.exports = exports['default'];
