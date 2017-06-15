import React from "react";
import {connect} from "react-redux"
import { bindActionCreators } from 'redux';
import QuantityActions from '../ducks/quantity/actions';
import {audio} from '../anim'
import {getValue, getTransformedValue, getCoordSys, getQuantityData, getPlaying} from '../ducks/quantity/selectors'
import Animation from "./Animation";
import InfoBar from "./InfoBar"
import Handle from "./Handle"

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
	onDragEnd(props, endVal){
		if (this.isPlaying){
			audio.play()
		}
		console.log(this.isPlaying)
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
			fontSize:titleFontSize,
			textAnchor:"middle",
			x:(width+50)/2,
			fill:color,

		}
		var sideBarStyle = {
			width:width+'px',
			fontFamily:"helvetica",
			fontSize: 15,

		}

		return (
			<div style={sideBarStyle}>
                <svg
					width={width}
					height={height}
					>
					<rect
						width={width}
						height={height}
						fill='#666'/>
					<text
						{...textStyle}
						y={20}>
						Part 01:
					</text>
					<text
						{...textStyle}
						y={20+titleFontSize+5}>
						Simple Harmonic Oscillator
					</text>
					<Animation
						pos={{x:10, y:9}}
						quantity='animTime'
						scale={1.6}
						color={color}
						onPlay={this.onPlay}
						onPause={this.onPause}
						/>

					<line
						x1={15}
						x2={width-15}
						y1={height-15}
						y2={height-15}
						stroke={color}
						strokeWidth={3}
						strokeLinecap='round'
						/>
					<Handle
						quantity="animTime"
						y={height-15}
						min={15}
						max={width-15}
						onDragEnd={this.onDragEnd}
						onDragStart={this.onDragStart}
						/>
				</svg>
				<div style={{overflow:"auto",backgroundColor:color,height:1000, margin:"0px"}}>
					<InfoBar></InfoBar>
				</div>
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
