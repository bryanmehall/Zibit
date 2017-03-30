'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Expression = (function (_React$Component) {
  _inherits(Expression, _React$Component);

  //should this be textbox??

  function Expression(props) {
    _classCallCheck(this, Expression);

    _get(Object.getPrototypeOf(Expression.prototype), 'constructor', this).call(this, props);
  }

  _createClass(Expression, [{
    key: 'render',
    value: function render() {
      var pos = this.props.pos;
      var children = this.props.children;
      var exp = this;
      var x = this.props.pos.x;
      this.widths = [];
      var newChildren = [];
      children.forEach(function (child) {
        var dummyElement = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        dummyElement.textContent = child.props.symbol;
        dummyElement.style = "font-style: italic; font-family:'MathJax_Main,Times,serif'; font-size:1.6em;";
        document.getElementById('app').appendChild(dummyElement);
        var width = dummyElement.getBBox().width;
        newChildren.push(React.cloneElement(child, { pos: { x: x, y: 20 } }));
        x += width;
      });

      return (//render children with refs first
        React.createElement(
          'g',
          null,
          React.createElement(
            'g',
            { x: this.props.pos.x, y: this.props.pos.y, ref: 'expression' },
            newChildren
          )
        )
      );
    }
  }]);

  return Expression;
})(React.Component);
