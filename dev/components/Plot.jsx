import React from "react"
import {connect} from "react-redux"
import { bindActionCreators } from 'redux';
import * as QuantityActions from '../ducks/quantity/actions';
import {getValue, getQuantityData} from '../ducks/quantity/selectors'
import {getChildren} from '../ducks/widget/selectors'
import {CoordSys, Scale} from './Scale'
import Axis from './Axis'
import Abstraction from './Abstraction'



class Plot extends React.Component {
	render(){
		var plotId = this.props.id,
			width = this.props.width,//width in px from axis min
		 	height = this.props.height,//height in px from axis min
			pos = this.props.pos,
			xQuantity = this.props.xQuantity,
			yQuantity = this.props.yQuantity

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
	  var coordSys = new CoordSys(xScale, yScale)

	  var childTypes = {
		  "Abstraction": Abstraction
	  }
	  function createChild(childData){
		  var type = childTypes[childData.type]
		  var props = childData.props
		  props.key = props.id
		  props.coordSys = coordSys
		  props.clipPath = plotId
		  var children = childData.children
		  return React.createElement(type, props, children)
	  }
	  var children = this.props.childData.map(createChild)

	  return (
		  <g>
			  <defs>
				  <clipPath id={plotId}>
					  <rect x={pos.x} y={pos.y-height} width={width} height={height} />
				  </clipPath>
			  </defs>
			  {children}
			  <Axis scale={xScale} pos={pos.y}></Axis>
			  <Axis scale={yScale} pos={pos.x} vertical={true}></Axis>
		  </g>
	  )
  }
}

function mapStateToProps(state, props) {
	return {
		xQuantity:getQuantityData(state, props.xVar),
		yQuantity:getQuantityData(state, props.yVar),
		childData:getChildren(state,props.id)
	};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(QuantityActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Plot);

