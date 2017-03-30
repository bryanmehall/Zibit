import React from 'react';

class Axis extends React.Component {
	
	render(){
		var axis = this
		var scale = this.props.scale
		var width = scale.tMax-scale.tMin
		var showBar = this.props.showBar || true
		var tickValues = tickValues(scale)
		var ticks = tickValues.map(drawTick)
		function drawTick(value,i){
			var loc = scale.transform(value)
			return (
				<text 
					key={i} 
					x={loc} 
					y={axis.props.pos+25}
					textAnchor='middle'
					>{value}</text>)
		}
				//define base line
		var lineStyle = {
			"strokeWidth":1.8,
			"stroke":"black",
			"strokeLinecap": "round"
		}
		var baseline;
		if (this.props.vertical){
			baseline = <line/>
		} else {
			baseline = <line 
				style = {lineStyle}
				x1={scale.tMin} 
				x2={scale.tMax} 
				y1={this.props.pos} 
				y2={this.props.pos}
			/>
		}
		if (this.props.showBar)	{
			return (
				<g>
					{baseline}
					{ticks}
				</g>
			)
		} else {
			return (
				<g>
					{ticks}
				</g>
			)
		}
		
		function tickValues(scale){
			var spacing = tickSpacing(scale)
			var minTick = Math.floor(scale.min / spacing) * spacing
			var values = []
			var value = minTick
			while (value <= scale.max){
				values.push(value)
				value += spacing
			}
			return values
			
			function tickSpacing(scale) {
				var minInt = 5
				var range = scale.max - scale.min
  				var niceRange = Math.pow(10.0, Math.floor(Math.log10(range)))
  				if (range / niceRange >= 5){//spacing 10*10^n
    				return niceRange;
				} else if (range / (niceRange / 2.0) >= 5) {
    				return niceRange / 2.0; //spacing 5*10^n
				} else {
    				return niceRange / 5.0; //spacing 2*10^n
				}
			}	
		}
	}
}
export default Axis;