import React from "react"
import {connect} from "react-redux"
import { bindActionCreators } from 'redux';
import * as QuantityActions from '../ducks/quantity/actions';
import {getValue, getQuantityData, getSymbol} from '../ducks/quantity/selectors'
import { getProp } from '../ducks/widget/selectors'


class Population extends React.Component {
	render(){
		return (
			<svg
				style={{
					position:"absolute",
					left:pos.x,
					//backgroundColor:'gray',//for debug
					top:pos.y
				}}
				width={width}
				height={height}
				>
                <circle x={10} y={10} r={10}></circle>
			</svg>
		)
	}
}

function mapStateToProps(state, props) {
    return {
        pos: getProp(state, props.id, 'pos'),
        growthFactor: getValue(state, props.growthQuantity)
    }
}

function mapDispatchToProps(dispatch) {
  return {
    setValue: (quantity, value) => {
        dispatch(QuantityActions.setValue(quantity, value, true))
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Population);
