import React from "react";
import {connect} from "react-redux"
import { getValue, getTransformedValue, getCoordSys, getQuantityData, getPlaying } from '../ducks/quantity/selectors'
import QuantityActions from '../ducks/quantity/actions';
import Animation from "./Animation"
import Slider from "./Slider"
import { audio } from '../anim'
import {cardStyle} from './styles'
import {Anim} from './icons'

class AnimBlock extends React.Component {
	constructor(props){
		super(props)
		this.onDragStart = this.onDragStart.bind(this)
		//this.onDragMove = this.dragMove.bind(this)
		this.onDragEnd = this.onDragEnd.bind(this)
	}
    onDragStart(props, initVal){
		//this.isPlaying = this.props.playing

		//this.props.setPlay('animTime', false)
		audio.pause()
	}
	onDragEnd(props, endVal) {
		if (this.isPlaying){
			audio.play()
		}
		//this.props.setPlay('animTime', this.isPlaying)
	}
	onPlay(){
		audio.play()//move these to anim middleware
	}
	onPause(){
		audio.pause()
	}
    render(){
		const width = this.props.width || 100
		const height = this.props.height || 30
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
		const slider = (
			<Slider
				p1={{ x: 18, y: height-12 }}
				p2={{ x: width-18, y: height-12 }}
				min={0}
				max={10}
				value={3}
				showAxis={false}
				//onDragEnd={this.onDragEnd}
				//onDragStart={this.onDragStart}

				>
				<circle cx={0} cy={0} r={8} fill="#eee" filter="url(#dropShadow)"></circle>
			</Slider>
		)
        return (
            <div style={{display: "flex"}}>
				<div style={{ width: 50 }}>
					<Anim state="paused"></Anim>
				</div>

				<div style={{ flexGrow: 1, paddingTop: 8, paddingLeft: 10 }}>
					{ this.props.active ? this.props.text : this.props.title }
					{ this.props.active ? slider : null}
				</div>

			</div>
			/*
				<svg
					width={this.props.width}
					height={50}
					>
					<Animation
						pos={{ x: 18, y: 13 } }
						scale={1.7}
						color={color}
						onPlay={this.onPlay}
						onPause={this.onPause}
						/>
				</svg>
        	</div>*/
        )
    }
}

function mapStateToProps(state, props) {
	return {
		//playing:getPlaying(state, 'animTime')
	};
}

function mapDispatchToProps(dispatch) {
	return {
		/*setPlay:(name, value) => {
			dispatch(QuantityActions.setPlay(name, value))
		},*/
	};
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnimBlock);
