import React from "react"
import {connect} from "react-redux"
import { bindActionCreators } from 'redux'
import QuantityActions from '../ducks/quantity/actions';
import { getProp } from '../ducks/widget/selectors'



class Line extends React.Component {
	render() {
        const { p1, p2 } = this.props
        const dx = p2.x-p1.x
        const dy = p2.y-p1.y
        const padding = 10
		return (
            <svg
                style={{
                    position: "absolute",
                    left: p1.x-padding,
                    top: p1.y-padding
                }}
                width={Math.abs(p2.x-p1.x)+2*padding}
                height={Math.abs(p2.y-p1.y)+2*padding}
                >
                <line
                    x1={padding}
                    y1={padding}
                    x2={padding+dx}
                    y2={padding+dy}
                    strokeWidth="2px"
                    stroke="black"
                    strokeLinecap="round"
                    >
                </line>
            </svg>
		)
	}
}



function mapStateToProps(state, props) {
	return {
		p1: getProp(state, props.id, 'p1'),
        p2: getProp(state, props.id, 'p2')
	}
}

function mapDispatchToProps(dispatch) {
	return {
	}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Line);
