import React from 'react'
import { TestIcon, inactive, active, completed } from './icons'
import {connect} from "react-redux"

import TestBlock from './TestBlock'
import AnimBlock from './AnimBlock'
import LabBlock from './LabBlock'
import {Collapse} from 'react-collapse'
import {Motion, spring} from 'react-motion'
import {cardStyle} from './styles'
import ContentActions from '../ducks/content/actions'
import {
	getContentBlockTitle,
	getContentBlockType,
	getPartId,
	getCurrentCourseId,
	getCurrentPartId,
	getCurrentContentBlockId,
	getContentBlockText
} from '../ducks/content/selectors'




class ContentBlock extends React.Component {
	constructor(props){
		super(props)
		this.state = {highlighted :false}

		this.onMouseOver = this.onMouseOver.bind(this)
		this.onMouseOut = this.onMouseOut.bind(this)

	}
	componentDidMount
	onMouseOver(){
		this.setState({highlighted: true})

	}
	onMouseOut(){
		this.setState({highlighted: false})
	}
	render(){
		const component = this
		const type = this.props.type || 'anim'
		const {courseId, partId, contentBlockId, activeCourse, activePart, activeContentBlock} = this.props

		const highlighted = this.state.highlighted
		const textStyle = {
			cursor: "default",
			MozUserSelect: "none",
			WebkitUserSelect: "none",
			msUserSelect: "none",
		}
		let content
		if (type === 'anim'){
			content = <AnimBlock {...this.props} ></AnimBlock>
		} else if (type === 'lab') {
			content = <LabBlock {...this.props}></LabBlock>
		} else {
			content = <TestBlock {...this.props} />
		}
		let contentBlockStyle
		if (this.props.active){
			contentBlockStyle = {
				tv: spring(0),//text value
				alpha: spring(1)
			}

		} else if (this.state.highlighted){
			contentBlockStyle = {
				tv: spring(100),
				alpha:spring(0.1)
			}
		} else {
			contentBlockStyle = {
				tv: spring(100),
				alpha :spring(0)
			}
		}
		return (
			<Collapse isOpened={true}>
				<Motion  style={contentBlockStyle}>
					{value => {
						return <div
							style={{
								display: 'flex',
								padding:10,
								cursor:"pointer",
								backgroundColor: `rgba(238,238,238,${value.alpha})`,
								color: `hsl(0,0%,${value.tv}%)`
							}}
							onClick = {()=>{component.props.activateContentBlock(this.props.courseId, this.props.partId, this.props.contentBlockId)}}
							onMouseOver={this.onMouseOver}
							onMouseOut = {this.onMouseOut}
							>
							{content}
						</div>
					}}
				</Motion>
			</Collapse>
		)
	}
}

function mapStateToProps(state, props) {
	const courseId = props.courseId
	const partId = props.partId
	const contentBlockId = props.contentBlockId
	const active = getCurrentCourseId(state) === courseId &&
		  getCurrentPartId(state) === partId &&
		  getCurrentContentBlockId(state) === contentBlockId
		return {
			title: getContentBlockTitle(state, courseId, partId, contentBlockId),
			type: getContentBlockType(state, courseId, partId, contentBlockId),
			text: getContentBlockText(state, courseId, partId, contentBlockId),
			active: active
		}
}

function mapDispatchToProps(dispatch) {
	return {
		activateContentBlock: (courseId, partId, contentBlockId) => {
			dispatch(ContentActions.activateContentBlock(courseId, partId, contentBlockId))
			}
	};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContentBlock)
