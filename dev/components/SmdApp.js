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

var _Scale2 = _interopRequireDefault(_Scale);

var _Slider = require('./Slider');

var _Slider2 = _interopRequireDefault(_Slider);

var _Plot = require('./Plot');

var _Plot2 = _interopRequireDefault(_Plot);

var _Abstraction = require('./Abstraction');

var _Abstraction2 = _interopRequireDefault(_Abstraction);

var _Expression = require('./Expression');

var _Expression2 = _interopRequireDefault(_Expression);

var _Value = require('./Value');

var _Value2 = _interopRequireDefault(_Value);

var SmdApp = (function (_React$Component) {
   _inherits(SmdApp, _React$Component);

   function SmdApp(props) {
      _classCallCheck(this, SmdApp);

      _get(Object.getPrototypeOf(SmdApp.prototype), "constructor", this).call(this, props);
   }

   _createClass(SmdApp, [{
      key: "render",
      value: function render() {
         var actions = this.props.actions;

         var childTypes = {
            "Plot": _Plot2["default"],
            "Expression": _Expression2["default"]
         };

         function createChild(childData) {
            var type = childTypes[childData.type];
            var props = childData.props;
            props.key = props.id;
            return _react2["default"].createElement(type, props);
         }
         var children = this.props.childData.map(createChild);
         var app = this;
         return _react2["default"].createElement(
            "svg",
            { width: 700, height: 600 },
            _react2["default"].createElement(
               "defs",
               null,
               _react2["default"].createElement(
                  "filter",
                  { id: "highlight", primitiveUnits: "userSpaceOnUse" },
                  _react2["default"].createElement("feMorphology", { operator: "dilate", radius: "1.5", "in": "SourceAlpha", result: "expanded" }),
                  _react2["default"].createElement("feFlood", { floodColor: "#80d8ff", result: "highlightColor" }),
                  _react2["default"].createElement("feComposite", { "in": "highlightColor", in2: "expanded", operator: "in", result: "expandedColored" }),
                  _react2["default"].createElement("feGaussianBlur", { stdDeviation: "2", "in": "expandedColored", result: "highlight" }),
                  _react2["default"].createElement("feComposite", { operator: "over", "in": "SourceGraphic", in2: "highlight" })
               ),
               _react2["default"].createElement(
                  "filter",
                  { id: "textBackground", primitiveUnits: "userSpaceOnUse" },
                  _react2["default"].createElement("feMorphology", { operator: "dilate", radius: "100", "in": "SourceAlpha", result: "expanded" }),
                  _react2["default"].createElement("feFlood", { floodColor: "white", result: "highlightColor" }),
                  _react2["default"].createElement("feComposite", { "in": "highlightColor", in2: "expanded", operator: "in", result: "expandedColored" }),
                  _react2["default"].createElement("feGaussianBlur", { stdDeviation: "1", "in": "expandedColored", result: "highlight" }),
                  _react2["default"].createElement("feComposite", { operator: "over", "in": "SourceGraphic", in2: "highlight" })
               )
            ),
            children
         );
      }
   }]);

   return SmdApp;
})(_react2["default"].Component);

SmdApp.PropTypes = {
   actions: _react.PropTypes.object.isRequired
};

function mapStateToProps(state, props) {
   return {
      childData: (0, _ducksWidgetSelectors.getChildren)(state, 'app')
   };
}

function mapDispatchToProps(dispatch) {
   return {
      actions: (0, _redux.bindActionCreators)(QuantityActions, dispatch)
   };
}

exports["default"] = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(SmdApp);
module.exports = exports["default"];
