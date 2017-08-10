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
		this.width = 640
		this.height = 480

		this.tracker = new tracking.ColorTracker([ 'yellow'])
		this.tracker.on('track', function(event) {
			if (event.data.length === 0) {
				// No colors were detected in this frame.
			} else {
				event.data.forEach(function(rect) {
					const x = rect.x + rect.width/2
					const y = rect.y + rect.height/2
					const xQuantity = component.props.xQuantity
					const yQuantity = component.props.yQuantity
					component.props.setValue(xQuantity, component.width-x)
					component.props.setValue(yQuantity, y)
				})
			}
		})
	}
	componentDidMount(){
		this.trackerTask = tracking.track("#myVideo",this.tracker, { camera: true } )
	}
	componentWillUnmount(){
		const component = this
		setTimeout(function () {
            component.trackerTask.stop();
        }, 100)
	}
	render() {

		return (
			<div>
				 <video
					 style = {{
						transform: "rotateY(180deg)",
						top:0,
						left:0
					}}
					 id="myVideo"
					 width={this.width}
					 height={this.height}
					 preload
					 autoPlay
					 loop
					 muted>
				</video>
				<svg style={{position:"absolute", left:0, top:0}}
					width={this.width}
					height={this.height}
					>
					<line></line>
					<circle
						fill = 'gray'
						stroke='black'
						strokeWidth='2px'
						cx={this.props.xValue}
						cy={this.props.yValue}
						r="20"/>
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
		setValue:(quantity, value) => {
			dispatch(QuantityActions.setValue(quantity, value))
		}
	};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tracker);
