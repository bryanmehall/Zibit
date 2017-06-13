import React from "react";
import {connect} from "react-redux"
import { bindActionCreators } from 'redux';
import QuantityActions from '../ducks/quantity/actions';
import WidgetActions from '../ducks/widget/actions'
import {getTransformedValue, getValue, getCoordSys, getQuantityData} from '../ducks/quantity/selectors'
import Draggable from "./Draggable"

class Mass extends React.Component {
	constructor(props){
		super(props)
		this.dragStart = this.dragStart.bind(this)
		this.dragMove = this.dragMove.bind(this)
		this.dragEnd = this.dragEnd.bind(this)
	}
	dragStart(initPos){
		this.props.setPlay('t', false)
		this.props.setValue('t', 0)
		this.startOffset = this.props.pos.y-initPos.y //offset in px
		this.props.setY0(this.startOffset, this.props.coordSys.yScale)

	}
	dragMove(newPos){
		var newYPos = newPos.y+this.startOffset
		this.props.setY0(newYPos, this.props.coordSys.yScale)
	}
	dragEnd(endPos){
		this.props.setHighlight('t', true)
		this.props.setPlay('t', true)
	}
	render(){
		var pos = this.props.pos
		var width = 80
		var height = 50
		var maskString = 'url(#'+this.props.mask+')'
		return(
			<Draggable dragStart={this.dragStart} dragMove={this.dragMove} dragEnd={this.dragEnd}>
				<g >
					<rect x={pos.x} y={0} width={width} height={pos.y+height} mask={maskString} fill='none' cursor='grab'></rect>
					<rect x={pos.x} y={pos.y-height} width={width} height={height} mask={maskString} fill='none' strokeWidth='2'stroke='black'></rect>
				</g>

			</Draggable>
    )
  }
}

function mapStateToProps(state, props) {
	var br = props.boundingRect
	var coordSys = getCoordSys(state, props.xVar, props.yVar, br)
	return {
		mass: getValue(state, 'm'),
		pos:{
			x:getTransformedValue(state, props.xVar, coordSys.xScale),
			y:getTransformedValue(state, props.yVar, coordSys.yScale)
		},

	};
}

function mapDispatchToProps(dispatch) {
	return {
		setY0:(value, scale) => {
			dispatch(QuantityActions.setValueFromCoords('y0', value, scale))
		},
		setValue:(name, value) => {
			dispatch(QuantityActions.setValue(name, value))
		},
		setHighlight:(name, value) => {
			dispatch(QuantityActions.setHighlight(name, value))
		},
		setActive:(name, value) => {
			dispatch(WidgetActions.setActive(name, value))
		},
		setPlay:(name, value) => {
			dispatch(QuantityActions.setPlay(name, value))
		},
	};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Mass);
