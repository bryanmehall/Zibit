import React from "react"
import {connect} from "react-redux"
import { bindActionCreators } from 'redux'
import QuantityActions from '../ducks/quantity/actions';
import {getValue, getColor, getHighlighted, getTransformedValue, getCoordSys, getQuantityData} from '../ducks/quantity/selectors'
import Path from "./Path"
import {HighlightFilter} from './filters'


class Pendulum extends React.Component {
	render() {
		const anchorPos = this.props.anchorPos
		const bobPos = this.props.bobPos

		return (
			<g>
				<line
					x1={anchorPos.x}
					y1={anchorPos.y}
					x2={bobPos.x}
					y2={bobPos.y}
					strokeWidth={2}
					stroke='black'
					/>
				<circle
					r={20}
					cx={bobPos.x}
					cy={bobPos.y}
					fill="white"
					/>

				<circle
					r={10}
					cx={anchorPos.x}
					cy={anchorPos.y}
					/>

			</g>
		)
	}
}




function mapStateToProps(state, props) {

	return {
		bobPos:{
			x:getValue(state, 'measuredX')+40,
			y:getValue(state, 'measuredY')
		},
		anchorPos:{
			x:350,
			y:20
		}
	}
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
)(Pendulum);
