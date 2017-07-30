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
import ContentBlock from "./ContentBlock"



class SideBar extends React.Component {

	render() {


		return (
			<div >
				<InfoBar width={this.props.width}>
					<ContentBlock >Intro</ContentBlock>
					<ContentBlock questionState={"completed"}>
						Adjust the damping coefficient so the oscillations don't decrease over time
					</ContentBlock>
					<ContentBlock questionState={"active"}> Adjust the damping coefficient so the system never oscillates</ContentBlock>
					<ContentBlock questionState={"inactive"}>Explore the relationship between the damping ratio and spring constant</ContentBlock>
				</InfoBar>
            </div>

		)
	}
}



function mapStateToProps(state, props) {
	var br = props.boundingRect
	return {
		//playing:getPlaying(state, 'animTime')
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
