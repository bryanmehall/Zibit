import React from "react"
import Scale from './Scale'
import Axis from './Axis'

class Plot extends React.Component {
  render(){
	  var width = this.props.width,//width in px from axis min
		  height = this.props.height,//height in px from axis min
		  pos = this.props.pos,
		  xQuantity = this.props.xQuantity,//state object of x quantity
		  yQuantity = this.props.yQuantity,//state object of y quantity
		  indQuantity = this.props.indQuantity || xQuantity //set independent variable

	  var xScale = new Scale({
		  min:xQuantity.min,
		  max:xQuantity.max,
		  tMin:pos.x,
		  tMax:pos.x+width
	  })
	  var yScale = new Scale({
		  min:yQuantity.min,
		  max:yQuantity.max,
		  tMin:pos.y,
		  tMax:pos.y-height
	  })
	  var coordSys =
    return (
		<g>
		<Axis scale={xScale} pos={pos.y}></Axis>
		<Axis scale={yScale} pos={pos.x} vertical={true}></Axis>
		</g>
	)
  }
}
export default Plot;
