'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Value = (function (_React$Component) {
  _inherits(Value, _React$Component);

  function Value(props) {
    _classCallCheck(this, Value);

    _get(Object.getPrototypeOf(Value.prototype), 'constructor', this).call(this, props);
    //this.handleClick = this.handleClick.bind(this);
  }

  _createClass(Value, [{
    key: 'handleClick',
    value: function handleClick(e) {
      var bbox = this.refs.text.getDOMNode().getBBox();
      console.log('bbox', bbox);
      this.props.select(bbox);
    }
  }, {
    key: 'render',
    value: function render() {
      var textStyle = {
        fontStyle: "italic",
        fontFamily: 'MathJax_Main,"Times New Roman",Times,serif',
        fontSize: "1.6em",
        WebkitTouchCallout: "none",
        WebkitUserSelect: "none",
        MozUserSelect: "none"
      };

      var text = React.createElement(
        'text',
        {
          style: textStyle,
          refs: 'text',
          x: this.props.pos.x,
          y: this.props.pos.y,
          ref: 'text'
        },
        this.props.symbol
      );

      return text;
    }
  }]);

  return Value;
})(React.Component);