import React from "react";
import {connect} from "react-redux"
import { getValue, getTransformedValue, getCoordSys, getQuantityData, getPlaying } from '../ducks/quantity/selectors'
import QuantityActions from '../ducks/quantity/actions';
import Animation from "./Animation"
import Slider from "./Slider"
import { audio } from '../anim'
import {cardStyle} from './styles'

class TitleBar extends React.Component {
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
    render(){
        const width = this.props.width
		const height = this.props.height
		const titleFontSize = 15
		const color = '#eee'
		const textStyle = {
			fontSize: titleFontSize,
			textAnchor: "middle",
			x: (width+50)/2,
			fill: color,

		}
		const sideBarStyle = {
			width: '25%',
			fontFamily: "helvetica",
			fontSize: 15
		}
        return (
            <div style={{ ...cardStyle,  width:width, backgroundColor: '#667', color: "#eee"}}>
				<div style={{ top: "14%", left:"25%", position:"absolute", textAlign:"center"}}>
					<div>Part 01:</div>
					<div>Simple Harmonic Oscillator</div>
				</div>

				<svg
					width={width}
					height={height}
					>
					<Animation
						pos={{ x: 18, y: 13 } }
						quantity="animTime"
						scale={1.7}
						color={color}
						onPlay={this.onPlay}
						onPause={this.onPause}
						/>
					<Slider
						p1={{ x: 18, y: height-12 }}
						p2={{ x: width-18, y: height-12 }}
						quantity="animTime"
						showAxis={false}
						onDragEnd={this.onDragEnd}
						onDragStart={this.onDragStart}
						>

						<circle cx={0} cy={0} r={8} fill="#eee" filter="url(#dropShadow)"></circle>
					</Slider>
				</svg>
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
		setPlay:(name, value) => {
			dispatch(QuantityActions.setPlay(name, value))
		},
	};
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TitleBar);
