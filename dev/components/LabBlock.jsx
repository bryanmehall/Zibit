import React from "react";
import {LabIcon} from './icons'
class LabBlock extends React.Component {
	render() {
		const complete = this.props.complete
		const active = this.props.active
		let  questionState
		if (this.props.active){
			questionState = "active"
		} else if (this.props.complete) {
			questionState = "completed"
		} else{
			questionState = "inactive"
		}
		const instructions = (
			<div>
				<ul >
					<li>Measure a length of 40 cm from the center of the mass along the string</li>
					<li>Pinch the string at that point and hold even with the anchor point of the pendulum on the screen</li>
					<li>Release the pendulum</li>
					<li>Press the space bar to start recording data</li>
				</ul>
			</div>
		)

		return (
			<div style={{display: "flex"}}>
				<div style={{ width: 50, flexGrow: 1}}>
					<LabIcon></LabIcon>
				</div>

				<div style={{ flexGrow: 2, padding:10 }}>
					{ this.props.active ? this.props.text : this.props.title }
					{ this.props.active ? instructions : null}
				</div>

			</div>
		)
	}
}

export default LabBlock


