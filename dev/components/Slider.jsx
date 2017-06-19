import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux"

import QuantityActions from '../ducks/quantity/actions';
import WidgetActions from '../ducks/widget/actions'
import { getTransformedValue, getValue, getScale, getMin, getMax} from '../ducks/quantity/selectors'
import Draggable from "./Draggable"
import Axis from './Axis';
import Handle from "./Handle"
import {Scale} from '../utils/scale'

class Slider extends React.Component {
	render() {
		const constPos = this.props.constPos
		const min = this.props.min
		const max = this.props.max
		const quantity = this.props.quantity
		const scale = this.props.scale

		const scaleObj = new Scale({//change
			min: scale.min,
			max: scale.max,
			tMin: min,
			tMax: max
		})
		const barStyle = {
			"strokeWidth": "3",
			"stroke": "#eee",
			"strokeLinecap": "round"
		}
		const highlightStyle = {
			"strokeWidth": "5",
			"stroke": "#666",
			"strokeLinecap": "round"
		}
		var axis = <Axis
			scale={scaleObj}
			pos={constPos}
			showBar={false}
		/>
		return (
			<g>
				<line 
					style={highlightStyle} 
					x1={min}
					x2={max}
					y1={constPos}
					y2={constPos}
				/>
				<line 
					style={barStyle} 
					x1={min}
					x2={max}
					y1={constPos}
					y2={constPos}
				/>
				<Handle
					quantity={quantity}
					y={constPos}
					min={min}
					max={max}
					onDragEnd={this.props.onDragEnd}
					onDragStart={this.props.onDragStart}
				/>
				{
					this.props.showAxis ? axis : null
				}
			</g>
		);
	}
}

function mapStateToProps(state, props) {
	//add support for full coordinate system
	var scale = getScale(state, props.quantity, props.min, props.max)
	return {
		scale: scale,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		setTransformedValue: (quantity, value, scale) => {
			dispatch(QuantityActions.setValueFromCoords(quantity, value, scale))
		},
		setValue: (name, value) => {
			dispatch(QuantityActions.setValue(name, value))
		},
		setActive: (name, value) => {
			dispatch(WidgetActions.setActive(name, value))
		},
		setPlay: (name, value) => {
			dispatch(QuantityActions.setPlay(name, value))
		},
	};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Slider);



