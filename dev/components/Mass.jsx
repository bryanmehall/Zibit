import React from "react";
import {connect} from "react-redux"
import { bindActionCreators } from 'redux';
import QuantityActions from '../ducks/quantity/actions';
import {getTransformedValue, getValue, getCoordSys, getQuantityData} from '../ducks/quantity/selectors'
import Draggable from "./Draggable"

class Mass extends React.Component {
	constructor(props){
		super(props)
		this.dragStart = this.dragStart.bind(this)
		this.dragMove = this.dragMove.bind(this)
	}
	dragStart(initPos){
		this.startOffset = this.props.pos.y-initPos.y //offset in px
	}
	dragMove(newPos){
		var newYPos = newPos.y+this.startOffset
		this.props.setY0(newYPos, this.props.coordSys.yScale)
	}

	render(){
		var pos = this.props.pos
		var width = 80
		var height = 50
		return(
			<Draggable dragStart={this.dragStart} dragMove={this.dragMove}>
				<rect x={pos.x} y={pos.y-height} width={width} height={height}></rect>
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
	};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Mass);
