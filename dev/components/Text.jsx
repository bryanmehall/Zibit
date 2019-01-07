import React from "react"
import {connect} from "react-redux"
import { bindActionCreators } from 'redux'
import QuantityActions from '../ducks/quantity/actions';
import { getProp } from '../ducks/widget/selectors'
import Math from './Math'


class Text extends React.Component {
	render() {
        const { pos, tex, visibility } = this.props
		return (
            <div
                style={{
                    position: "absolute",
                    left: pos.x,
                    //backgroundColor: 'blue',//for debug
                    top: pos.y
                }}>
                <Math
                    visibility={visibility}
                    tex={`\\text{${tex}}`}
                    >
                </Math>
            </div>
		)
	}
}



function mapStateToProps(state, props) {
	return {
		pos: getProp(state, props.id, 'pos'),
		tex: getProp(state, props.id, 'text'),
        visibility: getProp(state, props.id, 'opacity'),
	};
}

function mapDispatchToProps(dispatch) {
	return {
	}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Text);
