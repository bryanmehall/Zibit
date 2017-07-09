import React from 'react'
import { Link } from 'react-router-dom'
import { linkStyle } from './styles'
import { Route, Switch } from 'react-router'
import SmdApp from "./SmdApp"
import NavBar from './NavBar'

const Course = ({match}) => {
	const navPath = [
		{name:'Courses', id:'courses'},
		{name:match.params.courseId, id:match.params.courseId}
	]
	console.log(match.url)
	return (
		<Switch>


			<Route path={`${match.url}/:partId`} component={SmdApp}/>
			<Route exact path={`${match.url}`}>
				<div>
					<NavBar path={navPath}></NavBar>
					<ul>
						<li>
							<Link style={linkStyle} to={`${match.url}/sho`}>
								Part 01: Simple Harmonic Motion
							</Link>
						</li>
					</ul>
				</div>
			</Route>
		</Switch>

	)

}

export default Course
