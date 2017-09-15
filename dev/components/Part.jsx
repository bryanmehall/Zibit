import React from 'react'
import { connect } from "react-redux"
import ContentActions from '../ducks/content/actions'
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
	getCurrentContentBlockId,
	getPartIdByIndex
} from '../ducks/content/selectors'

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
		const isActive = this.props.activeContentBlock !== null
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
		const prevUrl = `/courses/${courseId}/${this.props.prevPartId}`
		const previousPartLink = this.props.hasPrevPart ? (<Link to={prevUrl}> Previous Part: {this.props.previousPartTitle}</Link>) : null
		const nextUrl = `/courses/${courseId}/${this.props.nextPartId}`
		const nextPartLink = this.props.hasNextPart ? (<Link to={nextUrl}>Next Part: {this.props.nextPartTitle}</Link>) : null
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
				{ isActive ? previousPartLink : null }
				{ contentBlocks.map(createContentBlockList) }
				{ isActive ? nextPartLink : null}
			</div>
		)
		const imageUrl = `/content/courses/${courseId}/${partId}/thumbnail.png`
		if (!visible) {
			return null
		} else {
			return (
			<div style={{margin:12}}>

				<div style = {{
							display:"flex",
							//backgroundColor:'#ccf',
							border:'black'}}>

					{contentBlockBar}
					{!isActive ?(
						<Link style={{ width:400, height:300, backgroundColor:"white", }}to={`/courses/${courseId}/${partId}/${contentBlocks[0]}`}>
							<img style={{maxWidth:'100%', maxHeight:'100%', margin:'0 auto', draggable:"false" }} src={imageUrl}></img>
						</Link>
					):(
						<div style={{maxWidth:'75%'}}>
								<Sim
								width={400}
								height={300}
								pos={{ x: sideBarWidth+cardStyle.margin, y: 0 }}
								courseId={courseId}
								partId={partId}
								contentBlockId={this.props.activeContentBlock}
								/>
						</div>
					)}
				</div>
			</div>
		)
		}

	}
}

function mapStateToProps(state, props) {
	const courseId = props.courseId
	const partId = props.partId
	const index = props.index
	const prevPartId = getPartIdByIndex(state, courseId, index-1)
	const hasPrevPart = prevPartId !== undefined
	const nextPartId = getPartIdByIndex(state, courseId, index+1)
	const hasNextPart = nextPartId !== undefined
	return {
		contentBlocks: getContentBlocks(state, courseId, partId),
		title: getPartTitle(state, courseId, partId),
		activeCourse: getCurrentCourseId(state),
		activePart: getCurrentPartId(state),
		activeContentBlock: getCurrentContentBlockId(state),
		hasPrevPart,
		prevPartId,
		previousPartTitle: hasPrevPart ? getPartTitle(state, courseId, prevPartId) : null,
		hasNextPart,
		nextPartId,
		nextPartTitle: hasNextPart ? getPartTitle(state, courseId, nextPartId) : null
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

