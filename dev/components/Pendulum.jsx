import React from "react"
import PropTypes from 'prop-types';
import {connect} from "react-redux"
import { bindActionCreators } from 'redux'
import QuantityActions from '../ducks/quantity/actions';
import {getValue, getColor, getHighlighted, getTransformedValue, getCoordSys, getQuantityData} from '../ducks/quantity/selectors'
import Path from "./Path"
import Draggable from "./Draggable"
import {HighlightFilter} from './filters'



class Pendulum extends React.Component {

	render() {

		const anchorPos = this.props.anchorPos
		const bobPos = this.props.bobPos

		const dragStart = (startPos)=>{
			this.props.setPlay('t', false)
			this.props.setValue('t', 0)
			this.dragOffset = {
				x:startPos.x,
				y:startPos.y
			}
			this.initPos = {
				x:bobPos.x,
				y:bobPos.y
			}
		}
		const dragMove = (pos) =>{
			const x = pos.x-this.dragOffset.x+this.initPos.x
			const y = pos.y-this.dragOffset.y+this.initPos.y
			const angle = Math.atan2(x-anchorPos.x, y-anchorPos.y)
			this.props.setInitialAngle(angle)
		}
		const dragEnd = (endPos) =>{
			this.props.setPlay('t', true)
		}
		return (
			<g>
				<line
					x1={anchorPos.x}
					y1={anchorPos.y}
					x2={bobPos.x}
					y2={bobPos.y}
					strokeWidth={2}
					stroke='black'
					/>
				<Draggable
					dragStart={dragStart}
					dragMove={dragMove}
					dragEnd={dragEnd}
					>
					<circle
					r={20}
					cx={bobPos.x}
					cy={bobPos.y}
					stroke='black'
					fill="white"
					/>
				</Draggable>

				<circle
					r={10}
					cx={anchorPos.x}
					cy={anchorPos.y}
					/>
			</g>
		)
	}
}

Pendulum.propTypes = {
	bobX: PropTypes.string,
	bobY: PropTypes.string,
	anchorX: PropTypes.string,
	anchorY: PropTypes.string,
}


function mapStateToProps(state, props) {
	var br = props.boundingRect //bounding rect of plot
	var coordSys = getCoordSys(state, props.bobX, props.bobY, br)

	return {
		bobPos:{
			x:getTransformedValue(state, props.bobX, coordSys.xScale),
			y:getTransformedValue(state, props.bobY, coordSys.yScale)
		},
		anchorPos:{
			x:getTransformedValue(state, props.anchorX, coordSys.xScale),
			y:getTransformedValue(state, props.anchorY, coordSys.yScale)
		}
	}
}

function mapDispatchToProps(dispatch) {
	return {
		setInitialAngle:(value) => {
			dispatch(QuantityActions.setValue('theta0', value))
		},
		setValue:(name, value) => {
			dispatch(QuantityActions.setValue(name, value))
		},
		setPlay:(name, value) => {
			dispatch(QuantityActions.setPlay(name, value))
		}
	};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pendulum);
