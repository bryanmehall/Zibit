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
	constructor(props){
		super(props)
		this.onDragStart = this.onDragStart.bind(this)
		//this.onDragMove = this.dragMove.bind(this)
		this.onDragEnd = this.onDragEnd.bind(this)
	}
	onDragStart(props, initVal){
		this.isPlaying = this.props.playing

		this.props.setPlay('animTime', false)
		audio.pause()
	}
	onDragEnd(props, endVal) {
		if (this.isPlaying){
			audio.play()
		}
		this.props.setPlay('animTime', this.isPlaying)
	}
	onPlay(){
		audio.play()
	}
	onPause(){
		audio.pause()
	}

	render() {

		var width = 300
		var height = 80
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
			fontSize: 15
		}

		return (
			<div style={sideBarStyle}>
				<div style={{ ...cardStyle, paddingLeft:10,backgroundColor: '#667', color: "#eee", position: "relative" }}>
					<div style={{position:"absolute", top:"14%", left:"25%", textAlign:"center"}}>
						<div>Part 01:</div>
						<div>Simple Harmonic Oscillator</div>
					</div>

					<svg
						width={width}
						height={height}
						>
						<Animation
							pos={{ x: 10, y: 9 } }
							quantity="animTime"
							scale={1.6}
							color={color}
							onPlay={this.onPlay}
							onPause={this.onPause}
							/>
						<Slider
							p1={{ x: 15, y: height-15 }}
							p2={{ x: width-15, y: height-15 }}
							quantity="animTime"
							showAxis={false}
							onDragEnd={this.onDragEnd}
							onDragStart={this.onDragStart}
							/>
					</svg>

				</div>
				<InfoBar>
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
