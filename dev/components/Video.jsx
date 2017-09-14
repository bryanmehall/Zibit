import React from "react";
import { connect } from "react-redux"
import { bindActionCreators } from 'redux';
import QuantityActions from '../ducks/quantity/actions';
import { getTransformedValue, getValue, getCoordSys } from '../ducks/quantity/selectors'


class Video extends React.Component {
	constructor(props){
		super(props)
		this.correctLag = this.correctLag.bind(this)
	}
	componentDidMount(){
		const video = this.refs.video
		video.addEventListener('timeupdate',() => {
			this.correctLag(true) //only do time skewing here
		})
	}
	componentWillUpdate(nextProps){
		this.correctLag(false) //no time skewing
	}
	correctLag(skewing){
		const video = this.refs.video
		const lag = this.props.time - video.currentTime //how far ahead is time relative to video time?
		const playbackRate = 1
		const pauseThreshold = 0.1

		if (lag > pauseThreshold){
			//console.log('playing')
			if (skewing){
				video.playbackRate = playbackRate+lag//proportional controller for lag
			}

			video.play()
		} else if (lag < -1*pauseThreshold){
			video.pause()
		} else if (Math.abs(lag)< pauseThreshold*10){ //avoid nan lag number
			if (skewing){
				video.playbackRate = playbackRate+lag
			}
		}
	}
	render(){
		const { contentBlockId, partId, courseId, playing, time } = this.props
		const videoUrl = `/content/courses/${courseId}/${partId}/${contentBlockId}.webm`
		//console.log(time)
		return (
			<video ref="video" width="640" height="480">
				<source src={videoUrl} type="video/webm"/>
			</video>
		)
	}
}




function mapStateToProps(state, props) {
	return {

	}
}

function mapDispatchToProps(dispatch) {
	return {
		setTime:(name, value) => {
			dispatch(QuantityActions.setValue(name, value))
		},
		setPlay:(name, value) => {
			dispatch(QuantityActions.setPlay(name, value))
		},
	};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Video)

