import React from "react";
import { connect } from "react-redux"
import AnimSlider from "./AnimSlider"
import { audio } from '../anim'
import { cardStyle } from './styles'
import { Anim } from './icons'
import ContentActions from '../ducks/content/actions'
import { getPlaying } from '../ducks/content/selectors'

class AnimBlock extends React.Component {
	constructor(props){
		super(props)
		this.onDragStart = this.onDragStart.bind(this)
		this.onDragMove = this.onDragMove.bind(this)
		this.onDragEnd = this.onDragEnd.bind(this)
	}
    onDragStart(fractionStart){
		this.isPlaying = this.props.playing
		this.props.setPlaying(this.props.id, false)
		//audio.pause()
	}
	onDragMove(dfrac){

	}
	onDragEnd() {
		//if (this.isPlaying){
		//	audio.play()
		//}
		//this.props.setPlay('animTime', this.isPlaying)
	}
	onPlay(){
		//this.props.setPlaying()
	}
	onPause(){
		//audio.pause()
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
			<AnimSlider
				width={width-10}
				fracDone={0.3}
				onDragStart={this.onDragStart}
				onDragEnd={this.onDragEnd}
				onDragMove={this.onDragMove}
				/>
		)
        return (
            <div>
				<div style={{ display: "flex" }}>
					<div style={{ flexGrow: 1, width: 50 }}>
						<Anim
							onClick={() => this.props.setPlaying(this.props.id, true)}
							state="paused"></Anim>
					</div>

					<div style={{ flexGrow: 2, padding:10 }}>
						{ this.props.active ? this.props.text : this.props.title }

					</div>
				</div>
				<div>
					{ this.props.active ? slider : null}
				</div>
			</div>
        )
    }
}

function mapStateToProps(state, props) {
	return {
		//playing:getPlaying(state, props.partId, props.id)
	};
}

function mapDispatchToProps(dispatch) {
	//console.log(ContentActions.default.setPlaying)
	//console.log(ContentActions.setPlaying)
	return {
		setPlaying: (blockId, value) => {
			dispatch(ContentActions.setPlaying(blockId, value))
		},
	};
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnimBlock);
