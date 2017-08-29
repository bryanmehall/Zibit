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
	getContentBlockTitle,
	courseIsLoading
} from '../ducks/content/selectors'
import Link from 'redux-first-router-link'
import ZibitLogo from './ZibitLogo'

class NavBar extends React.Component {

	render() {
		const navBarStyle = {
			fontFamily: "helvetica",
			verticalAlign:'middle',
			display: "flex",
			alignItems:"center",
			fontSize: 15,
			marginLeft:25,
			padding:10,
			height:40,
			color:"#eee"
		}
		const navLinkStyle = {
			...linkStyle,
			fontSize:20
		}
		const { courseTitle, partTitle, contentBlockTitle, courseId, partId, contentBlockId } = this.props
		const sep = <span style ={{
					  fontSize:24,
					  paddingLeft:10
				  }}
						> &#x232A; </span>
		const coursesLink = (
			<span >
				{sep}
				<Link
					style={navLinkStyle}
					to={`/`}>
					Courses
				</Link>
			</span>
		)
		const courseLink = (
			<span >
				{sep}
				<Link
					style={navLinkStyle}
					to={`/courses/${courseId}`}>
					{courseTitle}
				</Link>
			</span>
		)
		const partLink = (
			<span >
				{sep}
				<Link
					style={navLinkStyle}
					to={`/courses/${courseId}/${partId}`}>
					{partTitle}
				</Link>
			</span>
		)
		const contentBlockLink = (
			<span >
				{sep}
				<Link
					style={navLinkStyle}
					to={`/courses/${courseId}/${partId}/${contentBlockId}`}>
					{contentBlockTitle}
				</Link>
			</span>
		)
		return (
			<div style={navBarStyle}>
				<Link to="/"><ZibitLogo></ZibitLogo></Link>
				{courseId === null ? null : coursesLink}
				{courseId === null ? null : courseLink}
				{partId === null ? null : partLink}
				{contentBlockId === null ? null : contentBlockLink}
			</div>
		)
	}
}

function mapStateToProps(state, props) {
	const courseId = getCurrentCourseId(state)
	let courseLoading;
	if (courseId !== null){
		 courseLoading = courseIsLoading(state, courseId)
	} else {
		courseLoading = true
	}
	if (courseLoading) {
		return { loading: true }
	} else {
		const partId = getCurrentPartId(state)
		const contentBlockId = getCurrentContentBlockId(state)
		return {
			courseId,
			partId,
			contentBlockId,
			courseTitle: courseId === null ? null : getCourseTitle(state, courseId),
			partTitle: partId === null ? null : getPartTitle(state, courseId, partId),
			contentBlockTitle: contentBlockId === null ? null : getContentBlockTitle(state, courseId, partId, contentBlockId)
		}
	}



}

function mapDispatchToProps(dispatch) {
	return {
	}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar);
