import React from "react";
import {connect} from "react-redux"
import { bindActionCreators } from 'redux'
import QuantityActions from '../ducks/quantity/actions'
import {getValue, getQuantityData, getAnimatable, getPlaying} from '../ducks/quantity/selectors'

class Animation extends React.Component {
	constructor(props){
		super(props)
	}



	render() {
		var pos = this.props.pos
		var self = this
		var pause = "M0,0 L9,5 9,15 0,20 M9,5 L18,10 18,10 9,15"
		var play = "M0,0 L7,0 7,20 0,20 M11,0 L18,0 18,20 11,20"
		var fromPath = this.props.playing ? pause : play
		var toPath = this.props.playing ? play : pause
		return (
			<path
				transform = {'matrix(0.8 0 0 0.8 '+pos.x+' '+pos.y+')'}
				d={toPath}
				pointerEvents="bounding-box"
				fill='gray'
				onClick={function(){
					self.props.setPlay(self.props.quantity, !self.props.playing)
				}}
				>

				<animate
					from={fromPath}
					to={toPath}
					begin="click"
					attributeType="XML"
					attributeName="d"
					fill="freeze"
					keySplines=".4 0 1 1"
					repeatCount="1"
					dur=".2s"
					></animate>
			</path>
		)
	}
}

function mapStateToProps(state, props) {
	var quantityData = getQuantityData(state, props.quantity)
	return {
		playing: getPlaying(state, props.quantity),
		value: getValue(state, props.quantity)

	};
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
		},
		setValue:(name, value)=> {
			dispatch(QuantityActions.setValue(name, value))
		}
	};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Animation);
