import React from "react";
import {TestIcon} from './icons'
class TestBlock extends React.Component {
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
		const questionsList = (
			<ul style={{ listStyle: "none" }}>
				<li style={{ textDecoration: "underline" }}>what makes this happen?</li>
				<li style={{ textDecoration: "underline" }}>+ ask a new question</li>
			</ul>
		)
		return (
			<div style={{display: "flex"}}>
				<div style={{ width: 50 }}>
					<TestIcon state={questionState}></TestIcon>
				</div>

				<div style={{ flexGrow: 1, paddingTop: 8, paddingLeft: 10 }}>
					{ this.props.active ? this.props.text : this.props.title }
					{ this.props.active ? questionsList : null}
				</div>

			</div>
		)
	}
}

export default TestBlock


