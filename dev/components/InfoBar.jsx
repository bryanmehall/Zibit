import React from "react";
import {connect} from "react-redux"
import { bindActionCreators } from 'redux';
import QuantityActions from '../ducks/quantity/actions';
import {getValue, getTransformedValue, getCoordSys, getQuantityData} from '../ducks/quantity/selectors'
import Animation from "./Animation";
import ConceptCheck from "./ConceptCheck"

class InfoBar extends React.Component {

	render() {
		var headerStyle = {
			backgroundColor:"#ccc",
			height:"30px",

		}
		return (
			<div >
                <div style={headerStyle}>
					<div style={{ margin: 5 }}>Concept Check</div>
				</div>
				<div style={{ fontSize: 13 }}>
					<ConceptCheck questionState={"completed"}>
						Adjust the damping coefficient so the oscillations don't decrease over time
					</ConceptCheck>
					<ConceptCheck questionState={"active"}> Adjust the damping coefficient so the system never oscillates</ConceptCheck>
					<ConceptCheck questionState={"inactive"}>Explore the relationship between the damping ratio and spring constant</ConceptCheck>
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
