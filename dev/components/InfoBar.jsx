import React from "react";
import {connect} from "react-redux"
import { bindActionCreators } from 'redux';
import QuantityActions from '../ducks/quantity/actions';
import {getValue, getTransformedValue, getCoordSys, getQuantityData} from '../ducks/quantity/selectors'
import Animation from "./Animation";

class InfoBar extends React.Component {

	render() {
		var headerStyle = {
			backgroundColor:"#ccc",
			height:"30px",
		}
		return (
			<div >
                <div style={headerStyle}>
					header
				</div>
				<div>
					body
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
