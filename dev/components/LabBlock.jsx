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
				In this lab you will examine how the length of a pendulum impacts its period. (Approximate time required: 5 minutes once materials are gathered)
				Materials:
				<ul>
					<li>String: at least 40 cm (16 in) long. If you don’t have string, rolled tape, a very thin strip of paper or even the cord for headphones will work. (If you use your headphones be sure not to bend the wire too much, or they might break.)</li>
					<li>Mass: anything bright yellow so the webcam can track it. Ideally less than 8 cm in diameter and made of dense materials. Examples: highlighter marker cap, small sticky note pad (wedge the string between the papers), tennis ball, lemon, or anything with mass placed in a small clear plastic bag along with something yellow showing (leaf, paper, etc)</li>
					<li>Tape (if needed to secure mass to string)</li>
					<li>Ruler</li>
					<li>Webcam in a brightly lit room, ideally pointing at a plain background that does NOT include yellow. </li>
				</ul>
				Instructions:
				<ol>
					<li>Make a pendulum by securing the string or wire to the mass</li>
					<li>Measure a length of 40 cm from the center of the mass along the string</li>
					<li>Pinch the string at that point and hold it up in front of the computer screen so it is even with the anchor point of the pendulum on the screen.</li>
					<li>Pull the mass sideways about 15 degrees parallel to the screen and release it so it swings freely.</li>
					<li>Quickly press the spacebar to start recording data holding the anchor point still until data collection is complete.</li>
					<li>(NOTE-this procedure will be repeated using various string lengths during next testing phase) </li>
				</ol>
			</div>
		)

		return (
			<div style={{display: "flex"}}>
				<div style={{ width: 50, flexGrow: 1}}>

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


