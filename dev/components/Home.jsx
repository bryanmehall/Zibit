import ZibitLogo from "./ZibitLogo"
import SearchBar from "./SearchBar"
import Courses from './Courses'
import { Link } from 'react-router-dom'
import React from 'react'
import {linkStyle} from './styles'


class Home extends React.Component {
	render(){
		return (
			<div>
			<div
				style={{
					margin: ' auto',
					width: '50%',
					paddingTop:"8%"
				}}
					>
					<ZibitLogo
						width={120}
						style={{
						display:'block',
						margin:'auto'}}
						></ZibitLogo>
					<SearchBar></SearchBar>
			</div>
            <Link style={linkStyle} to="/courses">Courses</Link>
			</div>
		)
	}
}

export default Home
