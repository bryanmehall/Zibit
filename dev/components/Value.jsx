import React from "react";
import Slider from './Slider'
import {connect} from "react-redux"
import { bindActionCreators } from 'redux';
import QuantityActions from '../ducks/quantity/actions';
import {getValue, getQuantityData} from '../ducks/quantity/selectors'

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
	mouseOut(){
		this.props.setHighlight(this.props.quantity, false)
	}

	componentWillMount(){
		var dummyElement = document.createElementNS( 'http://www.w3.org/2000/svg','text')
			dummyElement.textContent = this.props.symbol
			dummyElement.style = "font-style: italic; font-family:'MathJax_Main,Times,serif'; font-size:1.6em;"
			document.getElementById('hiddenSvg').appendChild(dummyElement)
			this.width = dummyElement.getBBox().width
			console.log(this.props.index, this.width)
			this.props.getWidth(this.width, this.props.index)
	}

	componentDidMount(){
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
		var pos = this.props.pos
		var centerPos = {x:pos.x+this.width/2, y:pos.y}
		this.arrow = calcArrow(centerPos,.2)
	}

	render(){
		var filter = (this.props.highlighted) ? "url(#highlight)": null

		var text = (
			<text
				style={this.textStyle}
				x={this.props.pos.x}
				y={this.props.pos.y}
				ref="text"
				filter={filter}
				onMouseOver={this.mouseOver}
				onMouseOut={this.mouseOut}
			>
				{this.props.symbol}
			</text>
		)
    var overlay = <g>
			<g >
				<text
					x={this.props.pos.x+this.width}
					y={this.props.pos.y}
					style={this.textStyle}
					filter="url(#textBackground)">
					{' = '+(Math.round(this.props.quantityValue*100)/100)}
				</text>
			</g>
			<polygon fill='gray' points={this.arrow} />


        </g>
    
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

function mapStateToProps(state, props) {
	var quantityData = getQuantityData(state, props.quantity)
	return {
		symbol: quantityData.symbol,
		independent:quantityData.independent,
		highlighted:quantityData.highlighted,
		quantityValue: getValue(state, props.quantity)
	};
}

function mapDispatchToProps(dispatch) {
	return {
		setHighlight:(name,value) => {
			dispatch(QuantityActions.setHighlight(name, value))
		},
	};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Value);
