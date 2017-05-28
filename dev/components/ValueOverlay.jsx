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
	mouseOver(){
		this.props.setHighlight(this.props.quantity, true)
	}
	mouseOut(e){
		e.preventDefault()
		e.stopPropagation()
		this.props.setHighlight(this.props.quantity, false)
	}

	/*componentWillMount(){
		var dummyElement = document.createElementNS( 'http://www.w3.org/2000/svg','text')
			dummyElement.textContent = this.props.symbol
			dummyElement.style = "font-style: italic; font-family:'MathJax_Main,Times,serif'; font-size:1.6em;"
			document.getElementById('hiddenSvg').appendChild(dummyElement)
			this.width = dummyElement.getBBox().width
			console.log('value will mount', this.props.index, this.width)
			this.props.getWidth(this.width, this.props.index)
	}*/

	render(){
		console.log('rendering overlay', this.props)
    	var overlay = (
			<g>
				<text
					x={this.props.x}
					y={this.props.y}
					style={this.numberStyle}
					filter="url(#textBackground)"
				>
					{' = '+(Math.round(this.props.quantityValue*100)/100)}
				</text>

				<Animation
						onClick={function(playing){
							self.props.setPlay(self.props.quantity, playing)
						}}
						playing={this.props.playing}
						>
				</Animation>
				<polygon fill='gray' points={this.arrow} />
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
	console.log('props', props.valueBBox)
	return {
		valueBBox:props.valueBBox,
		symbol: quantityData.symbol,
		//independent:quantityData.independent,
		highlighted:quantityData.highlighted,
		quantityValue: getValue(state, props.quantity),
		//animatable:getAnimatable(state, props.quantity),
		//playing: getPlaying(state, props.quantity)
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
