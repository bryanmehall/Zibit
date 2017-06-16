"use strict";

Object.defineProperty(exports, "__esModule", {
   value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

var _redux = require('redux');

var _ducksQuantityActions = require('../ducks/quantity/actions');

var QuantityActions = _interopRequireWildcard(_ducksQuantityActions);

var _ducksQuantitySelectors = require('../ducks/quantity/selectors');

var _ducksWidgetSelectors = require('../ducks/widget/selectors');

var _Scale = require('./Scale');

var _Axis = require('./Axis');

var _Axis2 = _interopRequireDefault(_Axis);

var _Abstraction = require('./Abstraction');

var _Abstraction2 = _interopRequireDefault(_Abstraction);

var _Mass = require('./Mass');

var _Mass2 = _interopRequireDefault(_Mass);

var _Spring = require('./Spring');

var _Spring2 = _interopRequireDefault(_Spring);

var _Anchor = require('./Anchor');

var _Anchor2 = _interopRequireDefault(_Anchor);

var _Arrow = require('./Arrow');

var _Arrow2 = _interopRequireDefault(_Arrow);

var Plot = (function (_React$Component) {
   _inherits(Plot, _React$Component);

   function Plot() {
      _classCallCheck(this, Plot);

      _get(Object.getPrototypeOf(Plot.prototype), "constructor", this).apply(this, arguments);
   }

   _createClass(Plot, [{
      key: "render",
      value: function render() {
         var plotId = this.props.id,
             width = this.props.width,
             //width in px from axis min
         height = this.props.height,
             //height in px from axis min
         pos = this.props.pos,
             visibility = this.props.visibility || 1,
             xQuantities = this.props.xQuantities,
             yQuantities = this.props.yQuantities,
             xQuantity = xQuantities[this.props.xActive],
             yQuantity = yQuantities[this.props.yActive];

         var xScale = new _Scale.Scale({
            min: xQuantity.min,
            max: xQuantity.max,
            tMin: pos.x,
            tMax: pos.x + width
         });
         var yScale = new _Scale.Scale({
            min: yQuantity.min,
            max: yQuantity.max,
            tMin: pos.y,
            tMax: pos.y - height
         });
         var coordSys = new _Scale.CoordSys(xScale, yScale);

         var childTypes = {
            Abstraction: _Abstraction2["default"],
            Mass: _Mass2["default"],
            Spring: _Spring2["default"],
            Anchor: _Anchor2["default"]
         };

         function createChild(childData) {
            var type = childTypes[childData.type];
            var props = childData.props;
            props.key = props.id;
            props.coordSys = coordSys;
            props.boundingRect = { xMin: pos.x, xMax: pos.x + width, yMin: pos.y, yMax: pos.y - height };
            props.mask = plotId;
            return _react2["default"].createElement(type, props);
         }
         var children = this.props.childData.map(createChild);
         return _react2["default"].createElement(
            "g",
            { opacity: visibility },
            _react2["default"].createElement(
               "defs",
               null,
               _react2["default"].createElement(
                  "mask",
                  { id: plotId },
                  _react2["default"].createElement("rect", { x: pos.x, y: pos.y - height, width: width, height: height, fill: "white", opacity: "1" })
               )
            ),
            children,
            _react2["default"].createElement(_Axis2["default"], { scale: xScale, pos: pos.y }),
            _react2["default"].createElement(_Axis2["default"], { scale: yScale, pos: pos.x, vertical: true })
         );
      }
   }]);

   return Plot;
})(_react2["default"].Component);

function mapStateToProps(state, props) {
   function getQuantities(quantityList) {
      var quantities = {};
      quantityList.forEach(function (name) {
         quantities[name] = (0, _ducksQuantitySelectors.getQuantityData)(state, name);
      });
      return quantities;
   }
   return {
      xActive: props.xVars[0],
      yActive: props.yVars[0],
      xQuantities: getQuantities(props.xVars),
      yQuantities: getQuantities(props.yVars),
      childData: (0, _ducksWidgetSelectors.getChildren)(state, props.id)
   };
}

function mapDispatchToProps(dispatch) {
   return {
      actions: (0, _redux.bindActionCreators)(QuantityActions, dispatch)
   };
}

exports["default"] = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Plot);
module.exports = exports["default"];
