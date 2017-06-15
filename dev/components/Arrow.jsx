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
		//this.startOffset = this.props.pos.y-initPos.y //offset in px
		//this.props.setX0(this.startOffset, this.props.coordSys.yScale)
	}
	dragMove(newPos){
		//var newYPos = newPos.y+this.startOffset
		//this.props.setX0(newYPos, this.props.coordSys.yScale)
	}
	dragEnd(endPos){

	}
	render(){
		var pos = this.props.pos
		var width = 80
		var height = 15
		var maskString = 'url(#'+this.props.mask+')'

		return(
    	)
  }
}


function calcArrow(tail, tip, w, tw, ar){
	//tailPosition, tipPosition, width of arrow,width of tip, tipWidth/tipLength
	var dx = tip.x-tail.x
	var dy = tip.y-tail.y
	var l = Math.sqrt(xd*dx+dy*dy)
	ar = ar || Math.sqrt(3)
	tw = tw || 2*w
	if (l<tw/ar){
		tw = l*ar
	}
	var tipL = tw/ar

	return [
		{x:100, y:-w/2},
		{x:l-tipL, y:-w/2},
		{x:l-tipL, y:-tw/2},
		{x:l, y:0},
		{x:l-tipL, y:tw/2},
		{x:l-tipL, y:w/2},
		{x:0, y:w/2}
	]
}

function mapStateToProps(state, props) {
	var br = props.boundingRect
	var coordSys = getCoordSys(state, props.xVar, props.yVar, br)
	return {
		pos:{
			x:getTransformedValue(state, props.xVar, coordSys.xScale),
			y:getTransformedValue(state, props.yVar, coordSys.yScale)
		},
		coordSys

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
