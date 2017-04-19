import React from "react"
import {connect} from "react-redux"
import { bindActionCreators } from 'redux';
import * as QuantityActions from '../ducks/quantity/actions';
import {getValue, getQuantityData} from '../ducks/quantity/selectors'
import {CoordSys, Scale} from './Scale'
import Axis from './Axis'
import Abstraction from './Abstraction'



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
	  var coordSys = new CoordSys(xScale, yScale)
    return (
		<g>
			<defs>
    			<clipPath id="plotId">
      				<rect x={pos.x} y={pos.y-height} width={width} height={height} />
    				</clipPath>
  			</defs>
			<Abstraction
				indVar="t"
				xVar="t"
				yVar="x"
				coordSys={coordSys}
				clipPath="plotId"
			></Abstraction>

			<Axis scale={xScale} pos={pos.y}></Axis>
			<Axis scale={yScale} pos={pos.x} vertical={true}></Axis>
		</g>
	)
  }
}

function mapStateToProps(state, props) {
	return {
		indQuantity:getQuantityData(state, props.xVar),
		xQuantity:getQuantityData(state, props.xVar),
		yQuantity:getQuantityData(state, props.yVar)
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

