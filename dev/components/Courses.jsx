import React from 'react'
import { Link } from 'react-router-dom'
import { Route, Switch } from 'react-router'
import { linkStyle } from './styles'
import Course from "./Course"
import SmdApp from './SmdApp'
import NavBar from './NavBar'


const Courses = ({match}) => {
	console.log('match for course list is: ', match)
	const navPath = [
		{name:'Courses', id:'courses'}
	]
	return (
		<Switch>
			<Route path={`${match.url}/:courseId`} component={Course}/>
			<Route exact path={match.url} >
				<div>
				<NavBar path={navPath}></NavBar>
				<ul>
					<li>
						<Link style={linkStyle} to={`${match.url}/controlsystems`}>
							Control Systems
						</Link>
					</li>
				</ul>
				</div>
			</Route>
		</Switch>





	)

}

export default Courses
