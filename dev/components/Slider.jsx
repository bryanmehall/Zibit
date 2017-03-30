import React from 'react';
import Axis from './Axis'

class Slider extends React.Component {
	//properties
	constructor(props){
		super(props);
		this.scale = this.props.scale
		this.width = 150;
		this.mouseDown = this.mouseDown.bind(this)
		this.pxPerUnit = this.width/(this.scale.max-this.scale.min)
	}
	
	mouseDown(e){
		var slider = this
		var prevVal = this.props.value
		//mouse difference in units
		var mouseError = slider.scale.invert(e.clientX)-prevVal
		
		var mouseMove = function(e){
			e.preventDefault();
			document.addEventListener('mouseup', mouseUp)
			var newValue = clamp(slider.scale.invert(e.clientX)-mouseError, slider.scale.min, slider.scale.max)
			slider.props.valueChange({value:newValue})
		}
		var mouseUp = function(e){
			document.removeEventListener('mousemove', mouseMove)
		}
		document.addEventListener('mousemove', mouseMove)
		function clamp(val,min,max){
			if (val<min){
				return min
			} else if (val > max){
				return max
			} else {
				return val
			}
		}
	}
	render() {
		var handleStyle = {
			"strokeWidth":"2",
			"stroke":"gray",
			"fill":"white",
			"cursor":"move"
		}
		var barStyle = {
			"strokeWidth":"8",
			"stroke":"white",
			"strokeLinecap": "round"
		}
		var highlightStyle = {
			"strokeWidth":"12",
			"stroke":"gray",
			"strokeLinecap": "round"
		}
		var pos = this.props.pos
		var scale = this.scale
		return (
			<g>
				<line 
					style={highlightStyle} 
					x1={scale.tMin} 
					x2={scale.tMax} 
					y1={pos} 
					y2={pos}
				/>
				<line 
					style={barStyle} 
					x1={scale.tMin} 
					x2={scale.tMax}
					y1={pos} 
					y2={pos}
				/>
				<circle 
					style={handleStyle} 
					ref="handle"
					onMouseDown={this.mouseDown} 
					cx={this.scale.transform(this.props.value)} 
					cy={pos} 
					r={9}
				/>
				<Axis scale={scale} pos={pos} showBar={false}/>
			</g>
    	);
	}
}

Slider.propTypes = {
  valueChange: React.PropTypes.func,
};
export default Slider;