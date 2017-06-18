import React from "react";
import {connect} from "react-redux"
import { bindActionCreators } from 'redux';
import QuantityActions from '../ducks/quantity/actions';
import {getTransformedValue, getValue, getCoordSys, getQuantityData} from '../ducks/quantity/selectors'
import getTransformString from '../utils/point'

class Dropdown extends React.Component {
	render(){

		return (
			<g transform = {getTransformString(this.props.pos)}>

			</g>
		)
	}
}

function mapStateToProps(state, props) {
	symbolMap = props.quantities.reduce((symbolMap, name) => (symbolMap[name] = getSymbol(state, name)))
	return {
		symbols:symbolMap

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
)(Dropdown);
