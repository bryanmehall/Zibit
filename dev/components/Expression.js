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

var Expression = (function (_React$Component) {
   _inherits(Expression, _React$Component);

   //should this be textbox??

   function Expression(props) {
      _classCallCheck(this, Expression);

      _get(Object.getPrototypeOf(Expression.prototype), 'constructor', this).call(this, props);
      this.offsets = [];
   }

   _createClass(Expression, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
         console.log('expression will mount', this.props.children);
      }
   }, {
      key: 'componentDidMount',
      value: function componentDidMount() {
         console.log('expression did mount');
      }
   }, {
      key: 'render',
      value: function render() {
         var exp = this;
         var children = this.props.children || [],
             len = children.length,
             newChildren,
             pos = this.props.pos,
             currentWidth = pos.x;
         if (children.length === 1) {
            children = [children];
         }
         console.log(children);

         function getWidth(width, index) {
            //allow child to pass width to parent
            console.log('gotWidth', index, width);
            newChildren[index].props.pos.x = currentWidth;
            exp.offsets.unshift(currentWidth);
            currentWidth += width;
         }

         newChildren = [];
         //for (var i= children.length-1; i>=0; i--){
         //var child = children[i]
         children.forEach(function (child, i) {
            var element = _react2['default'].cloneElement(child, { key: child.key, index: i, pos: { x: exp.offsets[children.length - i - 1], y: exp.props.pos.y }, getWidth: getWidth });
            newChildren.unshift(element);
         });
         console.log('renderng expression', newChildren);
         return (//render children with refs first
            _react2['default'].createElement(
               'g',
               null,
               _react2['default'].createElement(
                  'text',
                  { x: this.props.pos.x, y: this.props.pos.y, ref: 'expression' },
                  newChildren
               )
            )
         );
      }
   }]);

   return Expression;
})(_react2['default'].Component);

exports['default'] = Expression;
module.exports = exports['default'];
