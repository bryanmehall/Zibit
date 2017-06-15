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

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Slider = require('./Slider');

var _Slider2 = _interopRequireDefault(_Slider);

var _reactRedux = require("react-redux");

var _redux = require('redux');

var _ducksQuantityActions = require('../ducks/quantity/actions');

var _ducksQuantityActions2 = _interopRequireDefault(_ducksQuantityActions);

var _ducksWidgetActions = require('../ducks/widget/actions');

var _ducksWidgetActions2 = _interopRequireDefault(_ducksWidgetActions);

var _ducksQuantitySelectors = require('../ducks/quantity/selectors');

var _Animation = require('./Animation');

var _Animation2 = _interopRequireDefault(_Animation);

var Value = (function (_React$Component) {
   _inherits(Value, _React$Component);

   function Value(props) {
      _classCallCheck(this, Value);

      _get(Object.getPrototypeOf(Value.prototype), "constructor", this).call(this, props);
      this.mouseOver = this.mouseOver.bind(this);
      this.mouseOut = this.mouseOut.bind(this);
      this.arrow = calcArrow({ x: 100, y: 100 }, 100);
      this.textStyle = {
         fontStyle: "italic",
         fontFamily: 'MathJax_Main,"Times New Roman",Times,serif',
         fontSize: "1.6em",
         WebkitTouchCallout: "none",
         WebkitUserSelect: "none",
         MozUserSelect: "none"
      };
      this.numberStyle = {
         fontFamily: 'MathJax_Main,"Times New Roman",Times,serif',
         fontSize: "1.6em",
         WebkitTouchCallout: "none",
         WebkitUserSelect: "none",
         MozUserSelect: "none"

      };
      this.numberBoxStyle = {
         animationName: "scaleNumbers",
         animationDuration: '0.6s'
      };
   }

   _createClass(Value, [{
      key: "mouseOver",
      value: function mouseOver() {
         this.props.setHighlight(this.props.quantity, true);
      }
   }, {
      key: "mouseOut",
      value: function mouseOut(e) {
         e.preventDefault();
         e.stopPropagation();
         this.props.setHighlight(this.props.quantity, false);
      }
   }, {
      key: "componentDidMount",
      value: function componentDidMount() {
         if (this.props.pos === undefined) {
            var bBox = _reactDom2["default"].findDOMNode(this).getBBox();
            this.props.getWidth(bBox, this.props.id);
         }
      }
   }, {
      key: "render",
      value: function render() {
         var self = this;
         var pos = this.props.pos || { x: 200, y: 200 };
         var bbox = this.props.bbox || { width: 0 };

         var filter = this.props.highlighted ? "url(#highlight)" : null;

         var text = _react2["default"].createElement(
            "text",
            {
               style: this.textStyle,
               filter: filter,
               x: pos.x,
               y: pos.y,
               onMouseEnter: this.mouseOver
            },
            this.props.symbol
         );

         var overlay = _react2["default"].createElement(
            "g",
            {
               transform: 'translate(' + pos.x + ',' + pos.y + ')'
            },
            _react2["default"].createElement(
               "g",
               null,
               _react2["default"].createElement(
                  "text",
                  {
                     x: bbox.width + 5,
                     y: 0,
                     style: this.numberStyle,
                     filter: "url(#textBackground)" },
                  '= ' + Math.round(this.props.quantityValue * 100) / 100
               )
            ),
            _react2["default"].createElement(_Animation2["default"], {
               pos: { x: 0, y: 10 },
               quantity: this.props.quantity,
               playing: this.props.playing
            }),
            _react2["default"].createElement("path", { fill: "gray", d: this.arrow })
         );

         if (this.props.highlighted) {
            return _react2["default"].createElement(
               "g",
               {
                  onMouseLeave: this.mouseOut
               },
               overlay,
               text
            );
         } else {
            return text;
         }
      }
   }]);

   return Value;
})(_react2["default"].Component);

var pointToString = function pointToString(string, point) {
   return string + point.x + ',' + point.y + ' ';
};
var scalePoint = function scalePoint(point, xScale, yScale) {
   return { x: point.x * xScale, y: point.y * yScale };
};
var translatePoint = function translatePoint(p, t) {
   return { x: p.x + t.x, y: p.y + t.y };
};
function calcArrow(pos, scale) {
   var unscaledPoints = [{ x: 0, y: 10 }, { x: 10, y: 10 }, { x: 10, y: 0 }, { x: 30, y: 15 }, { x: 10, y: 30 }, { x: 10, y: 20 }, { x: 0, y: 20 }];
   var rightPoints = unscaledPoints.map(function (point) {
      return scalePoint(point, scale, scale);
   });
   var leftPoints = rightPoints.map(function (point) {
      return scalePoint(point, -1, 1);
   });
   var untranslatedPoints = rightPoints.concat(leftPoints);
   var points = untranslatedPoints.map(function (point) {
      return translatePoint(point, pos);
   });
   return points.reduce(pointToString, "");
}
function mapStateToProps(state, props) {
   var quantityData = (0, _ducksQuantitySelectors.getQuantityData)(state, props.quantity);
   return {
      symbol: quantityData.symbol,
      independent: quantityData.independent,
      highlighted: quantityData.highlighted,
      quantityValue: (0, _ducksQuantitySelectors.getValue)(state, props.quantity),
      //animatable:getAnimatable(state, props.quantity),
      playing: (0, _ducksQuantitySelectors.getPlaying)(state, props.quantity)
   };
}

function mapDispatchToProps(dispatch) {
   return {
      setHighlight: function setHighlight(name, value) {
         dispatch(_ducksQuantityActions2["default"].setHighlight(name, value));
      },
      setActive: function setActive(name, value) {
         dispatch(_ducksWidgetActions2["default"].setActive(name, value));
      },
      setPlay: function setPlay(name, value) {
         dispatch(_ducksQuantityActions2["default"].setPlay(name, value));
      }
   };
}

exports["default"] = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Value);
module.exports = exports["default"];
