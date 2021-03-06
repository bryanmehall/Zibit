import React from "react";

class Path extends React.Component {
	render(){
		var points,
			stroke = this.props.strokeColor || 'black',
			strokeWidth = this.props.strokeWidth || 1.8,
			transform= this.props.transform || "",
			fill =this.props.fill || "transparent",
			filter = (this.props.highlighted) ? this.props.filter : null
		if (this.props.hasOwnProperty('coordSys')){
			var coordSys = this.props.coordSys
			points = this.props.points.map(coordSys.transform)
		} else {
			points = this.props.points
		}
		var maskString = 'url(#'+this.props.mask+')'
		return(
				<path
				style={this.props.style}
				d={pointsToSVGPath(points)}
				fill={fill}
				stroke={stroke}
				transform={transform}
				strokeWidth={strokeWidth}
				mask={maskString}
				filter={filter}
				strokeLinejoin="round"
				shapeRendering="geometricPrecision"
				></path>

		)
	}
}

export default Path;


function pointsToSVGPath(data) {
	var svgPathArray = ['M',data[0].x+0.01, data[0].y+0.01];
	for(var i = 1; i<data.length; i++){
		if(data[i].hasOwnProperty('mx')){
			svgPathArray.push('M',data[i].mx,data[i].my);
		}
		if(data[i].hasOwnProperty('x')){
			svgPathArray.push('L',data[i].x,data[i].y);
		}
		if(data[i].hasOwnProperty('c1x')){
			svgPathArray.push('C');
			svgPathArray.push(data[i].c1x,data[i].c1y);
			svgPathArray.push(data[i].c2x,data[i].c2y);
			svgPathArray.push(data[i].c3x,data[i].c3y);
		}
	}
	return svgPathArray.join(' ');
}
