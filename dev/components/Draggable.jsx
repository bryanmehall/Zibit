import React from "react";
import PropTypes from 'prop-types';


class Draggable extends React.Component {
	constructor(props){
		super(props)
		this.mouseDown = this.mouseDown.bind(this)
	}
	mouseDown(e){
		const initPos = { x:e.clientX, y: e.clientY }
		var draggable = this
		if (this.props.hasOwnProperty('dragStart')){
			this.props.dragStart(initPos)
		}
		var mouseMove = function(e){
			e.preventDefault();
			e.stopPropagation();
			if (draggable.props.hasOwnProperty('dragMove')){
				draggable.props.dragMove({x:e.clientX, y:e.clientY}, initPos )
			}
		}
		var mouseUp = function(e){
			document.removeEventListener('mousemove', mouseMove)
			document.removeEventListener('mouseup', mouseUp)
			if (draggable.props.hasOwnProperty('dragEnd')){
				draggable.props.dragEnd({x:e.clientX, y:e.clientY}, initPos)
			}

		}
		document.addEventListener('mousemove', mouseMove)
		document.addEventListener('mouseup', mouseUp)

	}

	render(){
		return(
			<g
				onMouseDown={this.mouseDown}
				pointerEvents = 'all'
				cursor='pointer'
				>
				{this.props.children}
			</g>
		)
	}
}
Draggable.propTypes = {

}
export default Draggable;
