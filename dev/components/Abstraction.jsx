import React from "react";
import {connect} from "react-redux"
import { bindActionCreators } from 'redux';
import Path from "./Path";
import * as QuantityActions from '../ducks/quantity/actions';
import {getValue, getAbsPoints, getColor} from '../ducks/quantity/selectors'

class Abstraction extends React.Component {
	render(){

		var points = this.props.points
		return(
			<Path
				points={points}
				strokeColor={this.props.color}
				coordSys={this.props.coordSys}
				mask={this.props.mask}
			/>
		)
	}
}

function mapStateToProps(state, props) {
	return {
		points:getAbsPoints(state, props.indVar, props.xVar, props.yVar),
		color:getColor(state, props.xVar)
	};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(QuantityActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Abstraction);

