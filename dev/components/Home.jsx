import ZibitLogo from "./ZibitLogo"
import SearchBar from "./SearchBar"
import { connect } from 'react-redux'
import { getCurrentCourseId } from '../ducks/content/selectors'
import NavBar from './NavBar'
import Courses from './Courses'
import React from 'react'
import {linkStyle} from './styles'


class Home extends React.Component {
	render(){
		const searchQuerry = ''
		let header
		if (this.props.activeCourse === null ){
			header = <div
					style={{
						margin: ' auto',
						width: '50%',
						paddingTop: "8%"
					}}
						>
						<ZibitLogo
							width={120}
							style={{
								display: 'block',
								margin: 'auto'
							}}
							></ZibitLogo>
					{/*<SearchBar></SearchBar>*/}
				</div>
		} else {
			header = <NavBar></NavBar>
		}
		return (
			<div style={{fontFamily: '"Roboto", sans-serif'}}>
				{header}
					<Courses></Courses>
			</div>
		)
	}
}
const mapStateToProps = (state, props) => {
	return {
		activeCourse: getCurrentCourseId(state)
	}
}

const mapDispatchToProps = (dispatch) => {
	return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
