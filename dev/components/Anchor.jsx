import React from "react";
import {connect} from "react-redux"
import { bindActionCreators } from 'redux';
import QuantityActions from '../ducks/quantity/actions';
import {getTransformedValue, getValue, getCoordSys, getQuantityData} from '../ducks/quantity/selectors'
import Draggable from "./Draggable"

class Anchor extends React.Component {
	constructor(props){
		super(props)
		this.dragStart = this.dragStart.bind(this)
		this.dragMove = this.dragMove.bind(this)
		this.dragEnd = this.dragEnd.bind(this)
	}
	dragStart(initPos){
		this.startOffset = this.props.pos.y-initPos.y //offset in px
		this.props.setX0(this.startOffset, this.props.coordSys.yScale)
	}
	dragMove(newPos){
		var newYPos = newPos.y+this.startOffset
		this.props.setX0(newYPos, this.props.coordSys.yScale)
	}
	dragEnd(endPos){
		this.props.setPlay('t', true)
	}
	render(){
		var pos = this.props.pos
		var width = 80
		var height = 15
		var maskString = 'url(#'+this.props.mask+')'
		return(
			<Draggable dragStart={this.dragStart} dragMove={this.dragMove} dragEnd={this.dragEnd}>
				<g >
					<rect x={pos.x} y={0} width={width} height={pos.y+height} mask={maskString} fill='none' cursor='grab'></rect>
					<pattern id="diagonalHatch" patternUnits="userSpaceOnUse" viewBox="0 0 8 8" width="8" height="8">
  						<path d="M-2,2 l4,-4
          					 M0,8 l8,-8
							M6,10 l4,-4"
        					style={{stroke:'black', strokeWidth:1}} />
					</pattern>
					<rect x={pos.x} y={pos.y} width={width} height={height} mask={maskString} fill='url(#diagonalHatch)'></rect>
					<line x1={pos.x} x2={pos.x+width} y1={pos.y} y2={pos.y} stroke='black' strokeWidth={1.5}></line>
				</g>

			</Draggable>
    )
  }
}

function mapStateToProps(state, props) {
	var br = props.boundingRect
	var coordSys = getCoordSys(state, props.xVar, props.yVar, br)
	return {
		pos:{
			x:getTransformedValue(state, props.xVar, coordSys.xScale),
			y:getTransformedValue(state, props.yVar, coordSys.yScale)
		}

	};
}

function mapDispatchToProps(dispatch) {
	return {
		setX0:(value, scale) => {
			dispatch(QuantityActions.setValueFromCoords('x', value, scale))
		},
		setValue:(name, value) => {
			dispatch(QuantityActions.setValue(name, value))
		},
		setPlay:(name, value) => {
			dispatch(QuantityActions.setPlay(name, value))
		},
	};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Anchor);
