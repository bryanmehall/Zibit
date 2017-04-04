import React, {PropTypes} from "react"
import {connect} from "react-redux"
import { bindActionCreators } from 'redux';
import * as QuantityActions from '../actions/quantity';
import Scale from './Scale'
import Slider from './Slider'
import Plot from './Plot'

class SmdApp extends React.Component {
	constructor(props){
		super(props)
	}
	render(){
		const { quantities, actions } = this.props;
		var app = this
		var scale = new Scale({min:-10, max:500, tMin:100, tMax:300})
		function updateT(value){
			app.props.actions.setValue('t', value)
		}
		return <svg width={700} height={500}>
			<Plot
						xQuantity={quantities.t}
						yQuantity={quantities.t}
						width={300} height={300}
						pos={{x:50,y:400}}
						></Plot>
			<Slider scale={scale} pos={20} value={quantities.t.value} valueChange={updateT}/></svg>
	}
}

SmdApp.PropTypes = {
  quantities: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    quantities: state.quantities
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
