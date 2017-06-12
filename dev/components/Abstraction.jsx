import React from "react";
import {connect} from "react-redux"
import { bindActionCreators } from 'redux';
import Path from "./Path";
import * as QuantityActions from '../ducks/quantity/actions';
import {getValue, getAbsPoints} from '../ducks/quantity/selectors'

class Abstraction extends React.Component {
	render(){

		var points = this.props.points
		return(
			<Path
				points={points}
				coordSys={this.props.coordSys}
				mask={this.props.mask}
				></Path>
		)
	}
}

function mapStateToProps(state, props) {
	return {
		points:getAbsPoints(state, props.indVar, props.xVar, props.yVar)
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

