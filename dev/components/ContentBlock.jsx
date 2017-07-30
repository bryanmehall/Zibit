import React from 'react'
import { TestIcon, inactive, active, completed } from './icons'
import TestBlock from './TestBlock'
import AnimBlock from './AnimBlock'
import {Collapse} from 'react-collapse'
import {Motion, spring} from 'react-motion'
import {cardStyle} from './styles'



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
		const type = this.props.type || 'anim'
		const active = false
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
		} else {
			content = <TestBlock {...this.props} />
		}
		let contentBlockStyle
		if (this.props.active){
			contentBlockStyle = {
				tv: spring(0),
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

export default ContentBlock;
