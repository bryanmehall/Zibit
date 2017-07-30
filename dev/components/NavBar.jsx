import React from "react";
import {connect} from "react-redux"
import { bindActionCreators } from 'redux';
import {cardStyle, linkStyle} from './styles'
import { Link } from 'react-router-dom'
import ZibitLogo from './ZibitLogo'

class NavBar extends React.Component {

	render() {
		const navBarStyle = {
			fontFamily: "helvetica",
			verticalAlign:'middle',
			fontSize: 15,
			marginLeft:25,
			padding:10,
			height:30,
			color:"#eee"
		}

		const pathLinks = []
		let currPath = ''
		const createLinks = (pathElement) => {
			currPath += `/${pathElement.id}`
			pathLinks.push(
				<span key={pathElement.id}>
					<span style={{fontSize:25}}> &#9002; </span>
					<Link
						to={currPath}
						style={linkStyle}
						>
						{pathElement.name}
					</Link>
				</span>

			)
		}
		const path = this.props.path || []
		path.forEach(createLinks)
		return (
			<div style={navBarStyle}>
				<Link to="/"><ZibitLogo></ZibitLogo></Link>
				{pathLinks}
				</div>
		)
	}
}

function mapStateToProps(state, props) {
	var br = props.boundingRect
	return {
		currentCourseName:"ControlSystems",
		currentPartName:"Damped Harmonic Oscillator",
		currentContentName:"Intro"
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
)(NavBar);
