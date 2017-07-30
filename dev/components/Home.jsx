import ZibitLogo from "./ZibitLogo"
import { Link } from 'react-router-dom'
import React from 'react'
import {linkStyle} from './styles'


class Home extends React.Component {
	render(){
		return (
			<div>
				<ZibitLogo width={120}></ZibitLogo>
				<div>
					<Link style={linkStyle} to="/courses">Courses</Link>
				</div>
			</div>
		)
	}
}

export default Home
