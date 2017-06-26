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
import {dist} from '../utils/point'

class Slider extends React.Component {
	constructor(props){
		super(props)
		this.dragStart = this.dragStart.bind(this)
		this.dragMove = this.dragMove.bind(this)
		this.dragEnd = this.dragEnd.bind(this)
	}

	dragStart(initPos){
		const onDragStart = this.props.onDragStart
		if (typeof onDragStart == 'function') {
			onDragStart(this.props, initPos);
		}
		this.startOffset = this.props.pos.x-initPos.x //offset in px

	}

	dragMove(newPos){
		var newPos = newPos.x+this.startOffset
		this.props.setTransformedValue(this.props.quantity, newPos, this.props.scale)
	}

	dragEnd(endPos){
		const onDragEnd = this.props.onDragEnd
		if (typeof onDragEnd == 'function') {
			onDragEnd(this.props, endPos)
		}
	}
	render() {
		const p1 = this.props.p1
		const p2 = this.props.p2
		const min = this.props.min
		const max = this.props.max
		const quantity = this.props.quantity
		const scale = this.props.scale

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
		const axis = <Axis
			p1={p1}
			p2={p2}
			min={min}
			max={max}
			showBar={false}
		/>
		const handle = React.cloneElement(this.props.children[0],{
		})
		return (
			<g>
				<line 
					style={highlightStyle} 
					x1={p1.x}
					x2={p2.x}
					y1={p1.y}
					y2={p2.y}
				/>
				<line 
					style={barStyle} 
					x1={p1.x}
					x2={p2.x}
					y1={p1.y}
					y2={p2.y}
				/>
				<Draggable
					dragStart={this.dragStart}
					dragMove={this.dragMove}
					dragEnd={this.dragEnd}
					>
					{this.props.children}
				</Draggable>
				{this.props.showAxis ? axis : null}
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



