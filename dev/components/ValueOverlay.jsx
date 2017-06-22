import React from "react"
import ReactDOM from "react-dom"
import Slider from './Slider'
import {connect} from "react-redux"
import { bindActionCreators } from 'redux'
import QuantityActions from '../ducks/quantity/actions'
import WidgetActions from '../ducks/widget/actions'
import {getValue, getQuantityData, getAnimatable, getPlaying} from '../ducks/quantity/selectors'
import Animation from './Animation'

class ValueOverlay extends React.Component {
	constructor(props){
		super(props)
		this.numberStyle = {
			fontFamily:'MathJax_Main,"Times New Roman",Times,serif',
      		fontSize:"1.6em",
      		WebkitTouchCallout: "none",
      		WebkitUserSelect: "none",
      		MozUserSelect: "none"

		}
	}
	render(){
		const bbox = this.props.bbox
        console.log('props', this.props)
    	var overlay = (
			<g>

				<text
						x={bbox.width+bbox.x}
						y={0}
						style={this.numberStyle}
						filter="url(#textBackground)">
						{'= '+(Math.round(this.props.quantityValue*100)/100)}
					</text>
				<rect x={-100} y={5} height={50} width={175} fill="#eee"></rect>
				<Slider
					constPos={20}
					quantity={this.props.quantity}
					min={-75}
					max={75}
					showAxis={true}
					onDragStart={this.onDragStart}
					onDragEnd={this.onDragEnd}
					/>
				<Animation
					pos={{x:-100, y:12}}
					quantity = {this.props.quantity}
					playing={this.props.playing}
				></Animation>
                <rect
                    x={bbox.x}
                    y={bbox.y}
                    width={bbox.width}
                    height={bbox.height}
                    />
        	</g>
		)
		return overlay
	}
}

var pointToString = function(string, point){
	return string + point.x+','+point.y+' '
}
var scalePoint = function(point, xScale, yScale){
	return {x:point.x*xScale, y:point.y*yScale}
}
var translatePoint = function(p, t){
	return {x:p.x+t.x, y:p.y+t.y}
}
function calcArrow(pos, scale){
	var unscaledPoints = [{x:0, y:10},{x:10,y:10},{x:10,y:0}, {x:30,y:15}, {x:10,y:30}, {x:10,y:20}, {x:0,y:20}]
	var rightPoints = unscaledPoints.map((point) => {return scalePoint(point,scale,scale)})
	var leftPoints = rightPoints.map((point) => {return scalePoint(point, -1, 1)})
	var untranslatedPoints = rightPoints.concat(leftPoints)
	var points = untranslatedPoints.map((point)=>{return translatePoint(point, pos)})
	return points.reduce(pointToString,"")
}
function mapStateToProps(state, props) {
	var quantityData = getQuantityData(state, props.quantity)
	return {
		symbol: quantityData.symbol,
		independent:quantityData.independent,
		highlighted:quantityData.highlighted,
		quantityValue: getValue(state, props.quantity),
		//animatable:getAnimatable(state, props.quantity),
		playing: getPlaying(state, props.quantity)
	};
}

function mapDispatchToProps(dispatch) {
	return {
		setHighlight:(name, value) => {
			dispatch(QuantityActions.setHighlight(name, value))
		},
		setActive:(name, value) => {
			dispatch(WidgetActions.setActive(name, value))
		},
		setPlay:(name, value) => {
			dispatch(QuantityActions.setPlay(name, value))
		}
	};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ValueOverlay);
