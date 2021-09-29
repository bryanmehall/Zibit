import React from "react"
import {connect} from "react-redux"
import { bindActionCreators } from 'redux';
import * as QuantityActions from '../ducks/quantity/actions';
import {getValue, getQuantityData, getSymbol} from '../ducks/quantity/selectors'
import {getChildren} from '../ducks/widget/selectors'
import {mathVarStyle} from './styles'
import {CoordSys, Scale} from '../utils/scale'
import Axis from './Axis'
import Abstraction from './Abstraction'
import Mass from './Mass'
import Spring from './Spring'
import Anchor from './Anchor'
import Damper from './Damper'
import Pendulum from './Pendulum'
import Vector from './Vector'




class PolarPlot extends React.Component {
	render(){
        const { pos, radius, minAngle, maxAngle, thetaOffset } = this.props
        //thetaOffset is angle offset relative to graphics coordinates
        const x = pos.x
        const y = pos.y
		var plotId = this.props.id,
			width = radius*2,//width in px from axis min
			height = radius*2,//height in px from axis min
			axisPadding = 50,
			borderPadding = 10,
			visibility = this.props.visibility !== undefined ? this.props.visibility: 1,
			xQuantities = this.props.xQuantities,
			yQuantities = this.props.yQuantities,
			xQuantity = xQuantities[this.props.xActive],
			yQuantity = yQuantities[this.props.yActive]

		var childTypes = {
			Abstraction: Abstraction,
			Mass: Mass,
			Spring: Spring,
			Anchor: Anchor,
			Damper: Damper,
			Pendulum: Pendulum,
			Vector: Vector
		}

		function createChild(childData){
			var type = childTypes[childData.type]
			var props = childData.props
			props.key = props.id
			props.boundingRect = { xMin: pos.x-radius, xMax: pos.x+radius, yMin: pos.y+radius, yMax: pos.y-radius }
			props.mask = plotId
			return React.createElement(type, props)
		}
		var children = this.props.childData.map(createChild)
        const toCartesian = (origin, angle, radius) => ({
            x: origin.x + Math.cos(angle/180*Math.PI)*radius,
            y: origin.y - Math.sin(angle/180*Math.PI)*radius
        })
        const p1 = toCartesian({ x,y }, minAngle, radius)
        const p2 = toCartesian({ x,y }, maxAngle, radius)
        const tick = (angle) => {
            const inner = toCartesian({ x, y }, angle, radius)
            const outer = toCartesian({ x, y }, angle, radius+5)
            const labelPos = toCartesian({ x, y }, angle, radius+20)
            return <g key={angle}>
                <line x1={inner.x} y1={inner.y} x2={outer.x} y2={outer.y} stroke="black"></line>
                <text x={labelPos.x} y={labelPos.y} textAnchor="middle" alignmentBaseline="center" fontSize={11}>{angle-thetaOffset}</text>
            </g>
        }
        const num = 6 //number of ticks
        const tickAngles = new Array(num).fill(0).map((e, i) => (minAngle+(maxAngle-minAngle)/num*i)).concat(maxAngle)
        const ticks = tickAngles.map(tick)
        const axisLabelPos = toCartesian({x,y}, thetaOffset, radius+50)
		return (
			<svg
				style={{
					position: "absolute",
					left: 0, //pos.x-radius,
					//backgroundColor: '#ddf',//for debug
					top: 0//pos.y-radius
				}}
				width={width+axisPadding+borderPadding}
				height={height+axisPadding+borderPadding}
				>
				<g opacity={visibility}>
					<defs>
						<mask id={plotId}>
							<rect x={axisPadding} y={borderPadding} width={width} height={height} fill="white" opacity="1" />
						</mask>
					</defs>
					
                    <path d={`M ${p1.x} ${p1.y} A${radius} ${radius} 0 0 0 ${p2.x} ${p2.y}`} fill="none" stroke="black"></path>
                    {ticks}
					<text
						x={axisLabelPos.x}
						y={axisLabelPos.y}
                        textAnchor="middle"
						alignmentBaseline="middle"
						style={mathVarStyle}
						>
						{this.props.thetaLabel}
					</text>
                    {children}
				</g>
			</svg>
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
	const xActive = props.xVars[0]
	const yActive = props.yVars[0]
    const thetaActive = props.thetaVars[0]
	return {
		xActive,
		yActive,
		xLabel: getSymbol(state, xActive),
		yLabel: getSymbol(state, yActive),
        thetaLabel: getSymbol(state, thetaActive),
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
)(PolarPlot);

