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
			backgroundColor:"#667",
			color : '#eee',
			height:"20px",
			paddingLeft:18,

			borderBottom:"1px",
			paddingTop:10,
			paddingBottom:10
		}
		return (
			<div style={{...cardStyle, backgroundColor:"#eee", marginTop:10, overflow:"hidden"}}>
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
