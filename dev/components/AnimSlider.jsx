import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux"
import { getTransformedValue, getValue, getScale, getMin, getMax} from '../ducks/quantity/selectors'
import {getTransformString, getClosestPointOnLine} from '../utils/point'
import Draggable from "./Draggable"
import Axis from './Axis';
import Handle from "./Handle"
import {Scale} from '../utils/scale'
import {dist} from '../utils/point'

class AnimSlider extends React.Component {
	constructor(props){
		super(props)
	}
	dragStart(){}
	dragMove(){}
	dragEnd(){}
	render() {
		const width = this.props.width
		const frac = this.props.fracDone
		const offset = 10
		const barWidth = width-offset*2
		const height = offset*2
		const p1 = { x: offset, y: offset }
		const p2 = { x: barWidth, y: offset }

		const pos = { x: barWidth*frac+offset, y: offset }
		const barStyle = {
			"strokeWidth": "4",
			"stroke": "#0e759c",
			"strokeLinecap": "round"
		}
		return (
			<svg width={width} height={height}>
				<line
					style={barStyle}
					x1={p1.x}
					x2={p2.x}
					y1={p1.y}
					y2={p2.y}
				/>
				<Draggable
					dragStart={this.props.onDragStart}
					dragMove={this.props.onDragMove}
					dragEnd={this.props.onDragEnd}
					>
                    <g transform = {getTransformString(pos)}>
						<circle cx={0} cy={0} r={8} fill="#eee" stroke="#0e759c"></circle>
					</g>
				</Draggable>
			</svg>
		)
	}
}

export default AnimSlider



