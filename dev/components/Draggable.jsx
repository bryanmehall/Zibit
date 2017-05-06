import React from "react";
class Draggable extends React.Component {
	constructor(props){
		super(props)
		this.mouseDown = this.mouseDown.bind(this)
	}
	mouseDown(e){
		var initPos = {x:e.clientX, y:e.clientY}
		var draggable = this
		if (this.props.hasOwnProperty('dragStart')){
			this.props.dragStart(initPos)
		}

		var mouseMove = function(e){
			e.preventDefault();
			if (draggable.props.hasOwnProperty('dragMove')){
				draggable.props.dragMove({x:e.clientX, y:e.clientY})
			}
		}
		var mouseUp = function(e){
			document.removeEventListener('mousemove', mouseMove)
			if (draggable.props.hasOwnProperty('dragEnd')){
				draggable.props.dragEnd({x:e.clientX, y:e.clientY})
			}
		}
		document.addEventListener('mousemove', mouseMove)
		document.addEventListener('mouseup', mouseUp)

	}

	render(){
		return(
			<g onMouseDown={this.mouseDown}>
				{this.props.children}
			</g>
		)
	}
}
export default Draggable;
