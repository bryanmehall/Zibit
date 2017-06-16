import React from "react"
import {connect} from "react-redux"
import { bindActionCreators } from 'redux';
import * as QuantityActions from '../ducks/quantity/actions';
import {getValue, getQuantityData} from '../ducks/quantity/selectors'
import {getChildren} from '../ducks/widget/selectors'
import {CoordSys, Scale} from './Scale'
import Axis from './Axis'
import Abstraction from './Abstraction'
import Mass from './Mass'
import Spring from './Spring'
import Anchor from './Anchor'
import Arrow from './Arrow'
import Damper from './Damper'



class Plot extends React.Component {
	render(){
		var plotId = this.props.id,
			width = this.props.width,//width in px from axis min
		 	height = this.props.height,//height in px from axis min
			pos = this.props.pos,
			visibility = this.props.visibility || 1,
			xQuantities = this.props.xQuantities,
			yQuantities = this.props.yQuantities,
			xQuantity = xQuantities[this.props.xActive],
			yQuantity = yQuantities[this.props.yActive]

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
			Abstraction: Abstraction,
			Mass:Mass,
			Spring: Spring,
			Anchor: Anchor,
			Damper: Damper
		}

		function createChild(childData){
			var type = childTypes[childData.type]
			var props = childData.props
			props.key = props.id
			props.coordSys = coordSys
			props.boundingRect = {xMin:pos.x,xMax:pos.x+width,yMin:pos.y,yMax:pos.y-height}
			props.mask = plotId
			return React.createElement(type, props)
		}
		var children = this.props.childData.map(createChild)
		return (
			<g opacity={visibility}>
				<defs>
					<mask id={plotId}>
						<rect x={pos.x} y={pos.y-height} width={width} height={height} fill="white" opacity="1" />
					</mask>
				</defs>
				{children}
				<Axis scale={xScale} pos={pos.y}></Axis>
				<Axis scale={yScale} pos={pos.x} vertical={true}></Axis>
			</g>
		)
	}
}

function mapStateToProps(state, props) {
	function getQuantities(quantityList){
		var quantities = {}
		quantityList.forEach(function(name){
			quantities[name] = getQuantityData(state, name)
		})
		return quantities
	}
	return {
		xActive: props.xVars[0],
		yActive: props.yVars[0],
		xQuantities: getQuantities(props.xVars),
		yQuantities: getQuantities(props.yVars),
		childData: getChildren(state,props.id)
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

