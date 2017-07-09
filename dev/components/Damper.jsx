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
		var path = damperPath(p1, p2, this.props.c);
		return (
			<Path
				fill="transparent"
				stroke="black"
				strokeWidth = '1'
				points={path}
				mask={this.props.mask}
			></Path>
		)
	}
}

function damperPath(p1, p2, c){
	var W = 15;
	var s = 5;	//scale
	var x1 = p1.x;
	var y1 = p1.y;
	var x2 = p2.x;
	var y2 = p2.y;
	var w = W/4+(W/2 - Math.pow(W/2,1-c/s))/2;
	var L = Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2));	//length from p1 to p2
	var l = 30;	//length of cylinder
	var l_p = 25; //length of piston in cylinder
	var dx = l_p*(x2 - x1)/L; //x component of l_p
	var dy = l_p*(y2 - y1)/L;	//y component of l_p
	var Vx = W*(y2-y1)/L;
	var Vy = W*(x1-x2)/L;
	var vx = w*(y2-y1)/L;
	var vy = w*(x1-x2)/L;
	var g1 = { x: (L-l)/(2*L)*(x2-x1)+x1, y:(L-l)/(2*L)*(y2-y1)+y1};	//base of cylinder
	var g2 = { x: x2-(L-l)/(2*L)*(x2-x1), y:y2-(L-l)/(2*L)*(y2-y1)};	//ends of cylinder
	var g3 = { x: x2-(L-l)/(2*L)*(x2-x1) - dx, y: y2-(L-l)/(2*L)*(y2-y1) - dy};	//piston head
	var data = [{ x: x1,y: y1 }, {x:g1.x, y:g1.y}];
	data.push({mx:g2.x + Vx, my:g2.y + Vy, x:g1.x + Vx, y:g1.y + Vy});
	data.push({x:g1.x - Vx, y:g1.y - Vy});
	data.push({x:g2.x - Vx, y:g2.y - Vy});
	data.push({mx:g3.x+vx, my:g3.y+vy, x:g3.x-vx, y:g3.y-vy});
	data.push({mx:g3.x, my:g3.y ,x:x2, y:y2});

	return data;
}


function mapStateToProps(state, props) {
	var br = props.boundingRect
	var coordSys = getCoordSys(state, props.xVar1, props.yVar1, br)
	var coordSys2 = getCoordSys(state, props.xVar2, props.yVar2, br)
	return {
		c: getValue(state, 'c'),
		p2:{
			x:getTransformedValue(state, props.xVar1, coordSys.xScale)+20,
			y:getTransformedValue(state, props.yVar1, coordSys.yScale)
		},
		p1:{
			x:getTransformedValue(state,props.xVar2, coordSys2.xScale)+20,
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
