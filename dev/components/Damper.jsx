import React from "react";
import {connect} from "react-redux"
import { bindActionCreators } from 'redux';
import QuantityActions from '../ducks/quantity/actions';
import {getValue, getTransformedValue, getCoordSys, getQuantityData} from '../ducks/quantity/selectors'
import Path from "./Path";

class Damper extends React.Component {
	render() {
		var coordSys = this.props.coordSys
		var coordSys2 = this.props.coordSys2//there are two different origins to the coordinate systems one for x and one for y
		var p1 = this.props.p1
		var p2 = this.props.p2
		var path = springPath(p1, p2);
		return (
			<Path
				fill="transparent"
				stroke="black"
				strokeWidth = {Math.log10(this.props.k+1.1)}
				points={path}
				mask={this.props.mask}
			/>
		)
	}
}

function springPath(p1, p2){
	var x1 = p1.x;
	var y1 = p1.y;
	var x2 = p2.x;
	var y2 = p2.y;
	var w = 15;
	var L = Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2))
	var l = 0.6*L;
	var n = 5;
	var dx = l/n*(x2-x1)/L;
	var dy = l/n*(y2-y1)/L;
	var vx = w*(y2-y1)/L
	var vy = w*(x1-x2)/L
	var g1 = {x:(L-l)/(2*L)*(x2-x1)+x1, y:(L-l)/(2*L)*(y2-y1)+y1}
	var g2 = {x:x2-(L-l)/(2*L)*(x2-x1), y:y2-(L-l)/(2*L)*(y2-y1)}
	var data = [{x:x1,y:y1}, g1]
		for(var i=0; i<n; i++){
			data.push({x:(L-l)/(2*L)*(x2-x1)+x1+i*dx+0.25*dx+vx,y:(L-l)/(2*L)*(y2-y1)+y1+i*dy+0.25*dy+vy},
				{x:(L-l)/(2*L)*(x2-x1)+x1+i*dx+0.75*dx-vx,y:(L-l)/(2*L)*(y2-y1)+y1+i*dy+0.75*dy-vy});
		}
	data.push(g2,{x:x2,y:y2})

	return data;
}


function mapStateToProps(state, props) {
	var br = props.boundingRect
	var coordSys = getCoordSys(state, props.xVar1, props.yVar1, br)
	var coordSys2 = getCoordSys(state, props.xVar2, props.yVar2, br)
	return {
		k: getValue(state, 'k'),
		p2:{
			x:getTransformedValue(state, props.xVar1, coordSys.xScale)+60,
			y:getTransformedValue(state, props.yVar1, coordSys.yScale)
		},
		p1:{
			x:getTransformedValue(state,props.xVar2, coordSys2.xScale)+60,
			y:getTransformedValue(state, props.yVar2, coordSys2.yScale)
		}
	};
}

function mapDispatchToProps(dispatch) {
	return {
		setY0:(value) => {
			dispatch(QuantityActions.setValue('y0', value))
		},
	};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Damper);
