import React from 'react'
import { Link } from 'react-router-dom'
import { Route, Switch, Redirect } from 'react-router'
import { linkStyle } from './styles'
import Course from "./Course"
import SmdApp from './SmdApp'
import NavBar from './NavBar'


const Courses = ({match}) => {
	const navPath = [
		{name:'Courses', id:'courses'}
	]
	return (
		<Switch>
			<Route path={`/courses/:courseId`} component={Course}/>
			<Route path="/">
				<div>
					<Course id="controlsystems" expanded="false"></Course>
					<Course id="calculus" expanded="false"></Course>
					<Course id="mechanics" expanded="false"></Course>
				</div>
			</Route>
			<Redirect from="/courses/" to="/courses" />
		</Switch>
	)
}

export default Courses
