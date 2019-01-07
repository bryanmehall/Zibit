import React from "react";
import { connect } from "react-redux"
import QuantityActions from '../ducks/quantity/actions'
import Math from './Math'
import Slider from './Slider'
import * as math from 'mathjs'
import { getTex, getValue } from '../ducks/quantity/selectors'
import { getVisibility } from '../ducks/widget/selectors'


class Equation extends React.Component {

	render(){
        const pos = this.props.pos
        const indVars = this.props.indVars
        return (
            <div
                style={{
                    position: "absolute",
                    left: pos.x,
                    //backgroundColor: 'blue',//for debug
                    top: pos.y
                }}>
                <Math pos={{ x: 0, y: 0 }} visibility={this.props.visibility} tex={this.props.leftTex +' = '+this.props.rightTex}></Math>
                {indVars.map((varData) => (
                    <QuantitySlider varData={varData} setHighlight={this.props.setHighlight}></QuantitySlider>
                ))}
            </div>
            )
  }
}

const QuantitySlider = (props) => {
    const mouseIn = () => { props.setHighlight(props.varData.name, true) }
    const mouseOut = () => { props.setHighlight(props.varData.name, false) }
    return (
        <div
            onMouseEnter={mouseIn}
            onMouseLeave={mouseOut}
            style={{ display: 'flex' }}
            >
            <Math displayMode={false} tex={props.varData.name+'='+math.floor(props.varData.value)} style={{ flex: "0 0 100px" }}></Math>
            <svg height="40" style={{ flex: "1" }}>
                <Slider
                    p1={{ x: 10, y: 20 }}
                    p2={{ x: 260, y: 20 }}
                    quantity={props.varData.name}
                >
                    <circle x={10} y={0} r={10} fill="#888"></circle>
                </Slider>
            </svg>
        </div>
    )
}

function mapStateToProps(state, props) {
    const varData = props.indVars.map((name) => ({
        name: name,
        value: getValue(state, name)
    }))
	return {
        leftTex: getTex(state, props.quantity1),
        rightTex: getTex(state, props.quantity2),
        indVars: varData,
		pos: props.pos,
        visibility: typeof props.opacity === 'undefined' ? 1 : props.opacity
	};
}

function mapDispatchToProps(dispatch) {
	return {
        setHighlight: (name, value) => {
			dispatch(QuantityActions.setHighlight(name, value))
		}
	};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Equation);
