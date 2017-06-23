import React from "react"
import {connect} from "react-redux"

import QuantityActions from '../ducks/quantity/actions'
import WidgetActions from '../ducks/widget/actions'
import { getProp } from '../ducks/widget/selectors'
import {mathTextStyle} from './styles'


class EqText extends React.Component {
	render(){
		return <tspan style={mathTextStyle} dx="3">{this.props.text}</tspan>
	}
}

function mapStateToProps(state, props) {
	return {}// needed?
}

function mapDispatchToProps(dispatch) {
	return {
		setHighlight:(name, value) => {
			dispatch(QuantityActions.setHighlight(name, value))
		},
		setActive:(name, value) => {
			dispatch(WidgetActions.setActive(name, value))
		},
		setPlay:(name, value) => {
			dispatch(QuantityActions.setPlay(name, value))
		}
	};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EqText);
