import React from "react";
import {connect} from "react-redux"
import { bindActionCreators } from 'redux';
import QuantityActions from '../ducks/quantity/actions';
import {getValue, getTransformedValue, getCoordSys, getQuantityData} from '../ducks/quantity/selectors'
import Animation from "./Animation";
import ConceptCheck from "./ConceptCheck"
import {cardStyle} from './styles'

class InfoBar extends React.Component {

	render() {
		var headerStyle = {
			backgroundColor:"#ccc",
			height:"20px",
			padding:10
		}
		return (
			<div style={{...cardStyle, backgroundColor:"#e0f0ff", marginTop:10}}>
                <div style={headerStyle}>
					<div >Concept Check</div>
				</div>
				<div style={{ fontSize: 13, padding:10}}>
					{this.props.children}
				</div>
            </div>

		)
	}
}



function mapStateToProps(state, props) {
	var br = props.boundingRect
	return {
	};
}

function mapDispatchToProps(dispatch) {
	return {
		setY0:(value) => {
			dispatch(QuantityActions.setValue('y0', value))
		},
	};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InfoBar);
