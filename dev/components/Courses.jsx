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
			<Route exact path={match.url}>
				<div>
				<ul>
					<li>
						<Link style={linkStyle} to={`${match.url}/controlsystems`}>
							Control Systems
						</Link>
					</li>
					<li>
						<Link style={linkStyle} to={`${match.url}/calculus`}>
							Calculus
						</Link>
					</li>
					<li>
						<Link style={linkStyle} to={`${match.url}/mechanics`}>
							Mechanics
						</Link>
					</li>

				</ul>
				</div>
			</Route>
			<Redirect from="/courses/" to="/courses" />
		</Switch>





	)

}

export default Courses
