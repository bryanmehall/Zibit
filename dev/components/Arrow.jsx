import React from "react";
import {connect} from "react-redux"
import { bindActionCreators } from 'redux';
import QuantityActions from '../ducks/quantity/actions';
import {getTransformedValue, getValue, getCoordSys, getQuantityData} from '../ducks/quantity/selectors'
import Draggable from "./Draggable"
import Path from './Path'


class Arrow extends React.Component {
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
		var magnitude = this.props.magnitude || 10
		var angle = this.props.angle || 90
		var dx = this.props.dx || Math.cos(angle)*magnitude
		var dy = this.props.dy || Math.sin(angle)*magnitude
		var tail = {x:100, y:100}
		console.log(this.props.tail, tail)
		var tip = this.props.tip || {x:tail.x+dx, y:tail.y+dy}
		var maskString = 'url(#'+this.props.mask+')'
		var arrowPath = calcArrow(tail, tip, 10)
		var transform = 'translate('+tail.x+','+tail.y+') rotate('+angle+','+tail.x+','+tail.y+')'

		return(
			<Path points={arrowPath} transform={transform} fill="rgba(255,0,0,0.6)" strokeWidth="0"></Path>
    	)
  }
}


function calcArrow(tail, tip, w, tw, ar){
	//tailPosition, tipPosition, width of arrow,width of tip, tipWidth/tipLength
	var dx = tip.x-tail.x
	var dy = tip.y-tail.y
	var l = Math.sqrt(dx*dx+dy*dy)
	ar = ar || Math.sqrt(3)
	tw = tw || 2*w
	if (l<tw/ar){
		tw = l*ar
	}
	var tipL = tw/ar

	return [
		{x:0, y:-w/2},
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
	var quantity = props.quantity//defaults to y
	var xQuantity = props.xQuantity || quantity
	var coordSys = getCoordSys(state, xQuantity, quantity, br)
	return {
		/*pos:{
			x:getTransformedValue(state, props.xVar, coordSys.xScale),
			y:getTransformedValue(state, props.yVar, coordSys.yScale)
		},*/
		magnitude:getTransformedValue(state, quantity, coordSys.yScale)

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
)(Arrow);
