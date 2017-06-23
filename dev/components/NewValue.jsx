import React from "react"
import ReactDOM from "react-dom"
import { connect } from "react-redux"
import QuantityActions from '../ducks/quantity/actions'
import WidgetActions from '../ducks/widget/actions'
import { getValue, getQuantityData, getAnimatable, getPlaying } from '../ducks/quantity/selectors'
import {mathVarStyle} from './styles'


class NewValue extends React.Component {

	componentDidMount(){
        const domElement = ReactDOM.findDOMNode(this)
        const extent = domElement.getExtentOfChar(0)//use SVG v1.1
        const length = domElement.getComputedTextLength()
		const bbox = { x: extent.x, y: extent.y, height: extent.height, width: length }
        this.props.getBBox(bbox, this.props.id)
	}

	render(){
		var self = this
		var pos = this.props.pos || {x:200, y:200}
        var quantity = this.props.quantity
		var bbox = this.props.bbox || {width:0}
        var independent = this.props.independent
        const highlighted = this.props.highlighted
		var filter = highlighted ? "url(#highlight)" : null//seei f this works with css filters
        var mouseOver = () => {this.props.setHighlight(quantity,true)}
        var mouseOut = () => {this.props.setHighlight(quantity, false)}

		var text = (
                <tspan
                    style={mathVarStyle}
                    filter={filter}
					dx='3'
                    fill={highlighted ? "red" : "black"}
                    onMouseEnter={mouseOver}
                    onMouseLeave={mouseOut}
                >
                    {this.props.symbol}
                </tspan>
		)
        return text
    }
}

function mapStateToProps(state, props) {

	var quantityData = getQuantityData(state, props.quantity)
	return {
		symbol: quantityData.symbol,
		independent: quantityData.independent,
		highlighted: quantityData.highlighted,
		quantityValue: getValue(state, props.quantity),
		playing: getPlaying(state, props.quantity)
	};
}

function mapDispatchToProps(dispatch) {
	return {
		setHighlight:(name, value) => {
			dispatch(QuantityActions.setHighlight(name, value))
		},
		setActive:(name, value) => {
			dispatch(WidgetActions.setActive(name, value))
		},
		setPlay:(name, value) => {
			dispatch(QuantityActions.setPlay(name, value))
		}
	};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewValue);
