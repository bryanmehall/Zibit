import React from "react"
import {connect} from "react-redux"
import { bindActionCreators } from 'redux'
import tracking from '../utils/tracking';
import QuantityActions from '../ducks/quantity/actions';
import {getValue, getColor, getHighlighted, getTransformedValue, getCoordSys, getQuantityData} from '../ducks/quantity/selectors'


class Tracker extends React.Component {
	constructor(props){
		super(props)
		const component = this
		this.state = ({recording:false, tracking:0})
		this.tracker = new tracking.ColorTracker(['yellow'])
		this.tracker.on('track', function(event) {
			if (event.data.length === 0) {
				component.setState({tracking:0})
			} else {
				component.setState({tracking:event.data.length})
				event.data.forEach(function(rect) {
					const x = rect.x + rect.width/2
					const y = rect.y + rect.height/2
					const xQuantity = component.props.xQuantity
					const yQuantity = component.props.yQuantity
					component.props.setValue(xQuantity, component.props.width-x+component.offset)
					component.props.setValue(yQuantity, y)
				})
			}
		})
	}
	componentDidMount(){

		this.trackerTask = tracking.track("#myVideo",this.tracker, { camera: true } )
		const videoElement = document.getElementById("myVideo")
		videoElement.addEventListener('loadedmetadata', () => {
			const videoWidth = videoElement.videoWidth
			this.offset = (videoWidth-this.props.height)/2
		})

		document.addEventListener('click', (e) => {
			if (this.state.tracking === 0){
				//console.log('not tracking any objects')
			} else if (this.state.tracking === 1){
				this.setState({recording:true})
				this.props.startRecording()
			}
		})
	}
	componentWillUnmount(){
		const component = this
		setTimeout(function () {
            component.trackerTask.stop();
        }, 100)
	}
	render() {
		const {width, height} = this.props
		const overlayStyle = {
			position:"absolute",
			fontSize:30,
			color:'black',
			textShadow:"0px 0px 8px #fff"
		}
		const tracking0 = (
			<div style={overlayStyle}>Not tracking any objects</div>
		)
		const notRecording = (
			<div style={overlayStyle}>Click video to start recording</div>
		)
		const trackingMarker = (
			<circle
				fill = "none"
				stroke="yellow"
				strokeWidth="2px"
				cx={this.props.xValue}
				cy={this.props.yValue}
				r="25"
			/>
		)
		return (
			<div style={{
					width: width,
					height: height,
					overflow: "hidden",
					position: "absolute",
					display: "flex",
					margin: 0,
					padding: 0,
					alignSelf: "center",
					alignItems: "center",
					justifyContent: "center",
					top: 60,
					left: 50,
				}}>
				<video
					style = {{
					transform: "rotateY(180deg)",

					objectFit:"cover"
					}}

					id="myVideo"
					height={height}
					preload
					autoPlay
					loop
					muted
				/>

				{this.state.tracking === 0 ? tracking0 : null}
				{this.state.tracking === 1 && this.state.recording === false ? notRecording : null}
				<svg
					width={width}
					height={height}
					style={{position:"absolute"}}
					>
					{this.state.tracking === 1 ? trackingMarker : null}
				</svg>
			</div>
		)
	}
}



function mapStateToProps(state, props) {
	return {
		xValue: getValue(state, props.xQuantity),
		yValue: getValue(state, "measuredY")
	};
}

function mapDispatchToProps(dispatch) {
	return {
		setValue: (quantity, value) => {
			dispatch(QuantityActions.setValue(quantity, value, true))
		},
		startRecording: () => {
			dispatch(QuantityActions.setPlay('t', true))
		}

	};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tracker);
