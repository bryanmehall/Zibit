import React from 'react'
import {connect} from "react-redux"
import { bindActionCreators } from 'redux';
import ContentActions from '../ducks/content/actions'
import {UnmountClosed} from 'react-collapse'
import Link from 'redux-first-router-link'
import ContentBlock from './ContentBlock'
import { cardStyle, linkStyle, headerStyle } from './styles'

import {
	getContentBlocks,
	getPartTitle,
	getContentBlockTitle,
	getPartId,
	getCurrentCourseId,
	getCurrentPartId,
	getCurrentContentBlockId } from '../ducks/content/selectors'

import SmdApp from "./SmdApp"
import NavBar from './NavBar'
import Sim from './Sim'

class Part extends React.Component {
	constructor(props) {
		super(props);
		this.state = { width: '0', height: '0' };
		this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
	}

	componentDidMount() {
	  	this.updateWindowDimensions();
	  	window.addEventListener('resize', this.updateWindowDimensions);
	}

	componentWillUnmount() {
	  	window.removeEventListener('resize', this.updateWindowDimensions);
	}

	updateWindowDimensions() {
	  	this.setState({ width: window.innerWidth, height: window.innerHeight });
	}

	render() {
		const part = this
		const contentBlocks = this.props.contentBlocks //contentBlock ids
		const courseId = this.props.courseId
		const partId = this.props.partId
		const {activeCourse, activePart} = this.props
		const sideBarWidth = 0.25*this.state.width
		const margin = cardStyle.margin
		const expanded =  this.props.activeCourse === courseId
		const visible = (activeCourse === courseId && activePart === partId) || activePart === null
		const createContentBlockList = (contentBlockId, index) => {
			return (
					<div key={contentBlockId}>
						<ContentBlock
							courseId={courseId}
							partId={partId}
							contentBlockId={contentBlockId}
							width={sideBarWidth-margin*2}
							></ContentBlock>
					</div>
			)
		}
		const contentBlockBar = (

			<div style={{
					overflow: "hidden",
					width: sideBarWidth - cardStyle.margin,
					fontFamily: '"Roboto", sans-serif',
					fontWeight: "500",
					//backgroundColor:'gray',
					fontSize: 15,
					margin: 5,

				}}>
				<div style={headerStyle}>
					{this.props.title}
				</div>
				{contentBlocks.map(createContentBlockList)}
			</div>
		)

		if (!visible) {
			return null
		} else {
			return (
			<div>

				<div style = {{
							display:"flex",

							//backgroundColor:'#ccf',
							border:'black'}}>

					{contentBlockBar}
					<Sim
					width={400}
					height={300}
					pos={{ x: sideBarWidth+cardStyle.margin, y: 0 }}
					courseId={courseId}
					partId={partId}
					contentBlockId={this.props.activeContentBlock}
					/>
				</div>
			</div>
		)
		}

	}
}

function mapStateToProps(state, props) {
	const courseId = props.courseId
	const partId = props.partId
		return {
			contentBlocks: getContentBlocks(state, courseId, partId),
			title: getPartTitle(state, courseId, partId),
			activeCourse: getCurrentCourseId(state),
			activePart: getCurrentPartId(state),
			activeContentBlock: getCurrentContentBlockId(state)
		}
}

function mapDispatchToProps(dispatch) {
	return {
		activatePart: (courseId, partId) => (
			dispatch(ContentActions.activatePart(courseId, partId))
		)
	};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Part)

