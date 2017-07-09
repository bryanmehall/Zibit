import React from "react"
import ReactDOM from "react-dom"
import { connect } from "react-redux"
import QuantityActions from '../ducks/quantity/actions'
import WidgetActions from '../ducks/widget/actions'
import { getValue, getQuantityData, getAnimatable, getPlaying, getColor } from '../ducks/quantity/selectors'
import {mathVarStyle, mathTextStyle} from './styles'


class NewValue extends React.Component {

    componentDidUpdate(){
        this.props.callUpdate()
    }

	render(){
		var self = this
        var quantity = this.props.quantity
		var bbox = this.props.bbox || {width:0}
        var independent = this.props.independent
        const highlighted = this.props.highlighted
        const value = this.props.quantityValue
		var filter = highlighted ? "url(#highlight)" : null//seei f this works with css filters
        var mouseOver = () => {this.props.setHighlight(quantity,true)}
        var mouseOut = () => {this.props.setHighlight(quantity, false)}

        //const precision = this.props.precision || Math.min(3,Math.max(Math.log10(Math.abs(value)+2),1))
        //if (quantity = 't') {console.log('t',Math.log10(Math.abs(value)+2))}
        //because the default toPrecision function is just bad
        //converts scientific notation while keeping trailing zeroes
        const toPre = value.toPrecision(2)
        const displayValue = (toPre.indexOf('e') === -1) ?  toPre : parseFloat(toPre)

		var text = (
                <tspan
                    style={highlighted ? mathTextStyle : mathVarStyle}
                    filter={filter}
					dx='3'
                    fill={highlighted ? this.props.color : "black"}
                >
                    {highlighted ? displayValue : this.props.symbol}
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
		color: getColor(state, props.quantity),
		playing: getPlaying(state, props.quantity)
        //add precision as state
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
