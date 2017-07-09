import React from "react";
import {connect} from "react-redux"
import QuantityActions from '../ducks/quantity/actions';
import { audio } from '../anim'
import { getValue, getTransformedValue, getCoordSys, getQuantityData, getPlaying } from '../ducks/quantity/selectors'
import Animation from "./Animation";
import {cardStyle} from './styles'
import InfoBar from "./InfoBar"
import Handle from "./Handle"
import Slider from "./Slider"
import ConceptCheck from "./ConceptCheck"



class SideBar extends React.Component {

	render() {

		var width = 300
		var height = 85
		var titleFontSize = 15
		var color = '#eee'
		var textStyle = {
			fontSize: titleFontSize,
			textAnchor: "middle",
			x: (width+50)/2,
			fill: color,

		}
		var sideBarStyle = {
			width: '25%',
			fontFamily: "helvetica",
			fontSize: 15,
			top: 120,
			width: this.props.width
		}

		return (
			<div style={sideBarStyle}>
				<InfoBar width={this.props.width}>
					<ConceptCheck questionState={"completed"}>
						Adjust the damping coefficient so the oscillations don't decrease over time
					</ConceptCheck>
					<ConceptCheck questionState={"active"}> Adjust the damping coefficient so the system never oscillates</ConceptCheck>
					<ConceptCheck questionState={"inactive"}>Explore the relationship between the damping ratio and spring constant</ConceptCheck>
				</InfoBar>
            </div>

		)
	}
}



function mapStateToProps(state, props) {
	var br = props.boundingRect
	return {
		playing:getPlaying(state, 'animTime')
	};
}

function mapDispatchToProps(dispatch) {
	return {
		setY0:(value) => {
			dispatch(QuantityActions.setValue('y0', value))
		},
		setPlay:(name, value) => {
			dispatch(QuantityActions.setPlay(name, value))
		},
	};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideBar);
