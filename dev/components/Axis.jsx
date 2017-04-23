import React from 'react';


class Axis extends React.Component {
	
	render(){
		var axis = this
		var scale = this.props.scale
		var pos = this.props.pos//position at axis min in px orthogonal to axis
		var showBar = this.props.showBar !== false; //true to show axis bar
		var vertical = this.props.vertical
		var tickValues = tickValues(scale)
		var ticks = tickValues.map(drawTick)

		function drawTick(value,i){
			var loc = scale.transform(value)
			var textPos = axis.props.pos
			var textOffs = 18
			var x = vertical ? textPos-textOffs : loc;
			var y = vertical ? loc : textPos+textOffs;

			return (
				<text 
					key={i} 
					x={x}
					y={y}
					textAnchor='middle'
					alignmentBaseline='middle'
					>{value}</text>)
		}
				//define base line
		var lineStyle = {
			"strokeWidth":1,
			"stroke":"black",
			"strokeLinecap": "round"
		}
		var baseline;
		if (vertical){
			baseline = <line
				style = {lineStyle}
				x1={this.props.pos}
				x2={this.props.pos}
				y1={scale.tMin}
				y2={scale.tMax}
			/>
		} else {
			baseline = <line 
				style = {lineStyle}
				x1={scale.tMin} 
				x2={scale.tMax} 
				y1={this.props.pos} 
				y2={this.props.pos}
			/>
		}
		if (showBar) {
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
