import React from "react";
import {connect} from "react-redux"
import { bindActionCreators } from 'redux';
import QuantityActions from '../ducks/quantity/actions';
import {getValue, getTransformedValue, getCoordSys, getQuantityData} from '../ducks/quantity/selectors'
import Animation from "./Animation";

class SideBar extends React.Component {
	render() {

		return (
			<div style="backgroundColor:red">
                abc
            </div>

		)
	}
}



function mapStateToProps(state, props) {
	var br = props.boundingRect
	var coordSys = getCoordSys(state, props.xVar1, props.yVar1, br)
	var coordSys2 = getCoordSys(state, props.xVar2, props.yVar2, br)
	return {
		k: getValue(state, 'k'),
		p2:{
			x:getTransformedValue(state, props.xVar1, coordSys.xScale),
			y:getTransformedValue(state, props.yVar1, coordSys.yScale)
		},
		p1:{
			x:getTransformedValue(state,props.xVar2, coordSys2.xScale),
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
)(SideBar);
