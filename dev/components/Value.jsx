import React from "react"
import ReactDOM from "react-dom"
import Slider from './Slider'
import {connect} from "react-redux"
import { bindActionCreators } from 'redux'
import QuantityActions from '../ducks/quantity/actions'
import WidgetActions from '../ducks/widget/actions'
import {getValue, getQuantityData, getAnimatable, getPlaying} from '../ducks/quantity/selectors'
import Animation from './Animation'

class Value extends React.Component {
	constructor(props){
		super(props)
		this.mouseOver = this.mouseOver.bind(this)
		this.mouseOut = this.mouseOut.bind(this)

		this.textStyle = {
      		fontStyle: "italic",
			fontFamily:'MathJax_Main,"Times New Roman",Times,serif',
      		fontSize:"1.6em",
      		WebkitTouchCallout: "none",
      		WebkitUserSelect: "none",
      		MozUserSelect: "none"
    	}
		this.numberStyle = {
			fontFamily:'MathJax_Main,"Times New Roman",Times,serif',
      		fontSize:"1.6em",
      		WebkitTouchCallout: "none",
      		WebkitUserSelect: "none",
      		MozUserSelect: "none"

		}
		this.numberBoxStyle = {
			animationName:"scaleNumbers",
			animationDuration: '0.6s'
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

	componentDidMount(){
		if (this.props.pos === undefined){
			var bBox = ReactDOM.findDOMNode(this).getBBox()
			this.props.getWidth(bBox, this.props.id)
		}
	}

	render(){
		var self = this
		var pos = this.props.pos || {x:200, y:200}
		var bbox = this.props.bbox || {width:0}

		var filter = (this.props.highlighted) ? "url(#highlight)": null

		var text = (
			<text
				style={this.textStyle}
				filter={filter}
				x={pos.x}
				y={pos.y}
				onMouseOver={this.mouseOver}
				onMouseOut={this.mouseOut}
			>
				{this.props.symbol}
			</text>
		)

    	var overlay = (
			<g transform = {'translate('+pos.x+','+pos.y+')'}>
				<g>
					<text
						x={bbox.width}
						y={0}
						style={this.textStyle}
						filter="url(#textBackground)">
						{'='+(Math.round(this.props.quantityValue*100)/100)}
					</text>

				</g>
			<Animation
						onClick={function(playing){
							self.props.setPlay(self.props.quantity, playing)
						}}
						playing={this.props.playing}
						></Animation>
			<polygon fill='gray' points={this.arrow} />
        </g>
		)
    
    if (this.props.highlighted){
		return <g>
			{overlay}
			{text}

		</g>
	} else {
		return text
	}
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
)(Value);
