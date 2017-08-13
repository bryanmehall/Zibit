import React from 'react'
import {connect} from "react-redux"
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom'
import { linkStyle } from './styles'
import { Route, Switch, Redirect } from 'react-router'
import ContentActions from '../ducks/content/actions'
import { courseIsLoading, getParts, getCourseTitle, getPartTitle, getPartId } from '../ducks/content/selectors'
import SmdApp from "./SmdApp"
import NavBar from './NavBar'

class Course extends React.Component {
	componentDidMount(){
		this.props.fetchCourseData(this.props.id)
	}
	render() {
		const parts = this.props.parts //part ids
		const loading = this.props.loading
		const courseId = this.props.id
		const expanded = this.props.expanded || false

		const createPartList = (partData, index) => {

			return (
				<li key={getPartId(partData)}>
					<Link style={linkStyle} to={`/courses/${courseId}/${getPartId(partData)}`}>
						{`Part ${index}: ${getPartTitle(partData)}`}
					</Link>
				</li>
			)
		}
		const expandedCourse = (
			<div>
				{this.props.loading ? "Loading..." : parts.map(createPartList)}
			</div>
		)
		const collapsedCourse = (
			<Link to={`courses/${courseId}`}>
				<div style={{
						padding:20,
						margin:10,
						color:'#eee'
					}}>
							{this.props.loading ? "Loading..." : this.props.title}
				</div>
			</Link>
		)
		return (
			<Switch>
				<Route path={`$courses/${courseId}/:partId`} render={(props) => (<SmdApp {...props} loading={loading}/>)}/>
				<Redirect from={`$courses/${courseId}/`} to={`$/courses/${courseId}`} />
				<Route path={`courses/${courseId}`}>
					{expandedCourse}
				</Route>
				<Route path={'/'}>
					collapsedCourse
				</Route>
			</Switch>
		)
	}
}

function mapStateToProps(state, props) {

	return {
		id: props.id || props.match.params.courseId,
		loading: courseIsLoading(state),
		parts: getParts(state),
		title: getCourseTitle(state)
	};
}

function mapDispatchToProps(dispatch) {
	return {
		fetchCourseData: (courseId) => (
			dispatch(ContentActions.fetchCourseData(courseId))
		)
	};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Course)

