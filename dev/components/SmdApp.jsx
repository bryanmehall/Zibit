import React, {PropTypes} from "react"
import {connect} from "react-redux"
import { bindActionCreators } from 'redux';
import * as QuantityActions from '../ducks/quantity/actions';
import {getValue} from '../ducks/quantity/selectors'
import Scale from './Scale'
import Slider from './Slider'
import Plot from './Plot'


class SmdApp extends React.Component {
	constructor(props){
		super(props)
	}
	render(){
		const { actions } = this.props;
		var app = this
		function updateT(value){
			app.props.actions.setValue('t', value)
		}
		return <svg width={700} height={500}>
			<Plot
				xVar = 't'
				yVar = 'x'
				indVar='t'
				width={200}
				height={100}
				pos={{x:50,y:400}}
				>
			</Plot>
		</svg>
	}
}

SmdApp.PropTypes = {
	actions: PropTypes.object.isRequired
};

function mapStateToProps(state, props) {
  return {
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
)(SmdApp);
