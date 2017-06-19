import React from "react"
import ReactDOM from "react-dom"
import Slider from './Slider'
import {connect} from "react-redux"
import { bindActionCreators } from 'redux'
import QuantityActions from '../ducks/quantity/actions'
import WidgetActions from '../ducks/widget/actions'
import {getValue, getQuantityData, getAnimatable, getPlaying} from '../ducks/quantity/selectors'
import Animation from './Animation'
import ReactEditableSvgLabel from 'react-editable-svg-label'

class Value extends React.Component {
	constructor(props){
		super(props)
		this.mouseOver = this.mouseOver.bind(this)
		this.mouseOut = this.mouseOut.bind(this)
		this.onDragStart = this.onDragStart.bind(this)
		this.onDragEnd = this.onDragEnd.bind(this)
		this.arrow = calcArrow({ x:100, y:100 }, 100)
		this.textStyle = {
			fontStyle: "italic",
			fontFamily: 'MathJax_Main,"Times New Roman",Times,serif',
			fontSize: "1.6em",
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
	onDragStart() {
		this.isPlaying = this.props.playing
		this.props.setPlay(this.props.quantity, false)
	}
	onDragEnd() {
		this.props.setPlay(this.props.quantity, this.isPlaying)
	}

	render(){
		var self = this
		var pos = this.props.pos || {x:200, y:200}
        var translation = 'translate('+pos.x+','+pos.y+')'
		var bbox = this.props.bbox || {width:0}
        var independent = this.props.independent
		var filter = (this.props.highlighted) ? "url(#highlight)": null

		var text = (
			<text
				style={this.textStyle}
				filter={filter}

				onMouseEnter={this.mouseOver}
			>
				{this.props.symbol}
			</text>
		)
        /*<ReactEditableSvgLabel x={bbox.width+20} y={0} focusOnOpen={true}>
                    {(Math.round(this.props.quantityValue*100)/100)}
                </ReactEditableSvgLabel>*/
        var number = (
            <g>
                <rect x={-20} y={-bbox.height} width={80+bbox.width} height={bbox.height+40} fill="#eee"/>
                <text x={bbox.width} y={0} style={this.numberStyle}>= {(Math.round(this.props.quantityValue*100)/100)}</text>
            </g>
        )
    	var overlay = (//transform is relative to lower left corner of value text
			<g transform = {'translate('+pos.x+','+pos.y+')'}>
                    <Animation
                        pos={{x:0, y:10}}
                        quantity = {this.props.quantity}
                        playing={this.props.playing}
                    ></Animation>
				<g>
					<text
						x={bbox.width+5}
						y={0}
						style={this.numberStyle}
						filter="url(#textBackground)">
						{'= '+(Math.round(this.props.quantityValue*100)/100)}
					</text>
				</g>
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
        	</g>
		)
    
    if (this.props.highlighted){
		return <g onMouseLeave={this.mouseOut} transform = {translation}>
            {number}
            {independent ? overlay : null}
			{text}
		</g>
	} else {
		return (
            <g transform = {translation}>
                {text}
            </g>
        )
    }
  }
}

var pointToString = function(string, point){
	return string + point.x+', '+point.y+' '
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
)(Value);
