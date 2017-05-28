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

var ValueOverlay = (function (_React$Component) {
   _inherits(ValueOverlay, _React$Component);

   function ValueOverlay(props) {
      _classCallCheck(this, ValueOverlay);

      _get(Object.getPrototypeOf(ValueOverlay.prototype), "constructor", this).call(this, props);
      this.numberStyle = {
         fontFamily: 'MathJax_Main,"Times New Roman",Times,serif',
         fontSize: "1.6em",
         WebkitTouchCallout: "none",
         WebkitUserSelect: "none",
         MozUserSelect: "none"

      };
   }

   _createClass(ValueOverlay, [{
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

      /*componentWillMount(){
      	var dummyElement = document.createElementNS( 'http://www.w3.org/2000/svg','text')
      		dummyElement.textContent = this.props.symbol
      		dummyElement.style = "font-style: italic; font-family:'MathJax_Main,Times,serif'; font-size:1.6em;"
      		document.getElementById('hiddenSvg').appendChild(dummyElement)
      		this.width = dummyElement.getBBox().width
      		console.log('value will mount', this.props.index, this.width)
      		this.props.getWidth(this.width, this.props.index)
      }*/

   }, {
      key: "render",
      value: function render() {
         console.log('rendering overlay', this.props);
         var overlay = _react2["default"].createElement(
            "g",
            null,
            _react2["default"].createElement(
               "text",
               {
                  x: this.props.x,
                  y: this.props.y,
                  style: this.numberStyle,
                  filter: "url(#textBackground)"
               },
               ' = ' + Math.round(this.props.quantityValue * 100) / 100
            ),
            _react2["default"].createElement(_Animation2["default"], {
               onClick: function (playing) {
                  self.props.setPlay(self.props.quantity, playing);
               },
               playing: this.props.playing
            }),
            _react2["default"].createElement("polygon", { fill: "gray", points: this.arrow })
         );
         return overlay;
      }
   }]);

   return ValueOverlay;
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
   console.log('props', props.valueBBox);
   return {
      valueBBox: props.valueBBox,
      symbol: quantityData.symbol,
      //independent:quantityData.independent,
      highlighted: quantityData.highlighted,
      quantityValue: (0, _ducksQuantitySelectors.getValue)(state, props.quantity)
   };
}

//animatable:getAnimatable(state, props.quantity),
//playing: getPlaying(state, props.quantity)
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

exports["default"] = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ValueOverlay);
module.exports = exports["default"];
