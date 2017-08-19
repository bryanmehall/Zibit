import React from "react";
import {connect} from "react-redux"
import { bindActionCreators } from 'redux';
import {cardStyle, linkStyle} from './styles'
import {
	getCurrentCourseId,
	getCurrentPartId,
	getCurrentContentBlockId,
	getCourseTitle,
	getPartTitle,
	getContentBlockTitle
} from '../ducks/content/selectors'
import Link from 'redux-first-router-link'
import ZibitLogo from './ZibitLogo'

class NavBar extends React.Component {

	render() {
		const navBarStyle = {
			fontFamily: "helvetica",
			verticalAlign:'middle',
			fontSize: 15,
			marginLeft:25,
			padding:10,
			height:40,
			color:"#eee"
		}
		const {courseId, partId, contentBlockId} = this.props
		console.log(partId)
		return (
			<div style={navBarStyle}>
				<Link to="/"><ZibitLogo></ZibitLogo></Link>
				{courseId === null ? null : courseId}

				{partId === null ? null : partId}
				{contentBlockId === undefined}
			</div>
		)
	}
}

function mapStateToProps(state, props) {
	const courseId = getCurrentCourseId(state)
	const partId = getCurrentPartId(state)
	const contentBlockId = getCurrentContentBlockId(state)

	return {
		//courseTitle: courseId === null ? null : getCourseTitle(state, courseId),
		//partName: partId === null ? null : getPartTitle(state, courseId, partId),
		//contentBlockName: contentBlockId === null ? null : getContentBlockTitle(state, courseId, partId, contentBlockId)
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
