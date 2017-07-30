import React from 'react'
import {connect} from "react-redux"
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom'
import { linkStyle } from './styles'
import { Route, Switch, Redirect } from 'react-router'
import ContentActions from '../ducks/content/actions'
import { courseIsLoading, getParts, getPartTitle, getPartId } from '../ducks/content/selectors'
import SmdApp from "./SmdApp"
import NavBar from './NavBar'

class Course extends React.Component {
	componentDidMount(){
		this.props.fetchCourseData(this.props.match.params.courseId)
	}
	render() {
		const match = this.props.match
		const parts = this.props.parts //part ids
		const loading = this.props.loading
		const courseId = match.params.courseId
		const navPath = [
			{name:'Courses', id:'courses'},
			{name:match.params.courseId, id:match.params.courseId}
		]

		const createPartList = (partData, index) => {

			return (
				<li key={getPartId(partData)}>
					<Link style={linkStyle} to={`${match.url}/${getPartId(partData)}`}>
						{`Part ${index}: ${getPartTitle(partData)}`}
					</Link>
				</li>
			)
		}

		return (
			<Switch>
				<Route path={`${match.url}/:partId`} render={(props) => (<SmdApp {...props} loading={loading}/>)}/>
				<Route exact path={`${match.url}`}>
					<div>
						{this.props.loading ? "Loading..." : parts.map(createPartList)}
					</div>
				</Route>
				<Redirect from={`${match.url}/:courseId/`} to={`${match.url}/:courseId`} />

			</Switch>

		)
	}
}

function mapStateToProps(state, props) {
	return {
		loading: courseIsLoading(state),
		parts: getParts(state)
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

