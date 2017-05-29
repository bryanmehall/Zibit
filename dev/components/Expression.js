'use strict';

Object.defineProperty(exports, '__esModule', {
   value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Value = require('./Value');

var _Value2 = _interopRequireDefault(_Value);

var _ValueOverlay = require('./ValueOverlay');

var _ValueOverlay2 = _interopRequireDefault(_ValueOverlay);

var _reactRedux = require("react-redux");

var _redux = require('redux');

var _ducksQuantityActions = require('../ducks/quantity/actions');

var _ducksQuantityActions2 = _interopRequireDefault(_ducksQuantityActions);

var _ducksWidgetSelectors = require('../ducks/widget/selectors');

var Expression = (function (_React$Component) {
   _inherits(Expression, _React$Component);

   function Expression(props) {
      _classCallCheck(this, Expression);

      _get(Object.getPrototypeOf(Expression.prototype), 'constructor', this).call(this, props);
      this.getWidth = this.getWidth.bind(this);
      this.childProps = [];
      this.bBoxes = {};
      this.state = { subPositions: {} };
      this.offset = 0;
   }

   _createClass(Expression, [{
      key: 'getWidth',
      value: function getWidth(bbox, id) {
         var newSubPositions = Object.assign(this.state.subPositions, _defineProperty({}, id, { x: this.offset, y: 0 }));
         this.offset += bbox.width;
         this.bBoxes[id] = bbox;
         this.setState(newSubPositions);
      }
   }, {
      key: 'render',
      value: function render() {
         var self = this;
         var subPos = this.state.subPositions;
         var positioned = !(Object.keys(subPos).length === 0 && subPos.constructor === Object);
         var childTypes = {
            Expression: Expression,
            Value: _Value2['default']
         };
         function createChild(childData, i) {
            var type = childTypes[childData.type];
            var props = childData.props;
            props.key = props.id;
            props.pos = subPos[props.id];
            props.bbox = self.bBoxes[props.id];
            props.isSubExpression = true;
            props.getWidth = self.getWidth;
            return _react2['default'].createElement(type, props);
         }
         //define children in order to get widths and in reverse order for rendering

         if (positioned) {
            //if subPositins is empty
            var children = this.props.childData.map(createChild).reverse();
         } else {
            var children = this.props.childData.map(createChild);
         }

         var pos = this.props.pos;
         //if (this.props.isSubExpression){
         //	return (
         //		<tspan>
         //			{children}
         //		</tspan>
         //	)
         //} else {
         return (//render children with refs first
            _react2['default'].createElement(
               'g',
               { transform: 'translate(' + pos.x + ',' + pos.y + ')' },
               children
            )
         );
         //}
      }
   }]);

   return Expression;
})(_react2['default'].Component);

function mapStateToProps(state, props) {

   return {
      childData: (0, _ducksWidgetSelectors.getChildren)(state, props.id)
   };
}

function mapDispatchToProps(dispatch) {
   return {
      /*setHighlight:(name, value) => {
      	dispatch(QuantityActions.setHighlight(name, value))
      },
      setPlay:(name, value) => {
      	dispatch(QuantityActions.setPlay(name, value))
      }*/
   };
}

exports['default'] = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Expression);
module.exports = exports['default'];
