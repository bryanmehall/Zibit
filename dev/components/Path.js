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

var Path = (function (_React$Component) {
   _inherits(Path, _React$Component);

   function Path() {
      _classCallCheck(this, Path);

      _get(Object.getPrototypeOf(Path.prototype), "constructor", this).apply(this, arguments);
   }

   _createClass(Path, [{
      key: "render",
      value: function render() {
         var points,
             stroke = this.props.strokeColor || 'black',
             strokeWidth = this.props.strokeWidth || 1.8,
             transform = this.props.transform || "",
             fill = this.props.fill || "transparent",
             filter = this.props.highlighted ? "url(#highlight)" : null;
         if (this.props.hasOwnProperty('coordSys')) {
            var coordSys = this.props.coordSys;
            points = this.props.points.map(coordSys.transform);
         } else {
            points = this.props.points;
         }
         var maskString = 'url(#' + this.props.mask + ')';
         return _react2["default"].createElement("path", {
            d: pointsToSVGPath(points),
            fill: fill,
            stroke: stroke,
            transform: transform,
            strokeWidth: strokeWidth,
            mask: maskString,
            filter: filter,
            strokeLinejoin: "round",
            shapeRendering: "geometricPrecision"
         });
      }
   }]);

   return Path;
})(_react2["default"].Component);

exports["default"] = Path;

function pointsToSVGPath(data) {
   var svgPathArray = ['M', data[0].x, data[0].y];
   for (var i = 1; i < data.length; i++) {
      if (data[i].hasOwnProperty('mx')) {
         svgPathArray.push('M', data[i].mx, data[i].my);
      }
      if (data[i].hasOwnProperty('x')) {
         svgPathArray.push('L', data[i].x, data[i].y);
      }
      if (data[i].hasOwnProperty('c1x')) {
         svgPathArray.push('C');
         svgPathArray.push(data[i].c1x, data[i].c1y);
         svgPathArray.push(data[i].c2x, data[i].c2y);
         svgPathArray.push(data[i].c3x, data[i].c3y);
      }
   }
   return svgPathArray.join(' ');
}
module.exports = exports["default"];
