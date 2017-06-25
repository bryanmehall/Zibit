import React from 'react'
import { TestIcon, inactive, active, completed } from './icons'

class ConceptCheck extends React.Component {
	render(){
		const questionState = this.props.questionState
		const text = this.props.children
		const onAsk = this.props.onAsk
		const questions = this.props.questions
		const showQuestions = true

		const textStyle = {
			cursor: "default",
			MozUserSelect: "none",
			WebkitUserSelect: "none",
			msUserSelect: "none",
		}
		const questionsList = (
			<ul style={{ listStyle: "none" }}>
				<li style={{ textDecoration: "underline" }}>what makes this happen?</li>
				<li style={{ textDecoration: "underline" }}>+ ask a new question</li>

			</ul>
		)
		return (
			<div style={{ display: 'flex', marginTop: 10 }}>
				<div style={{ width: 50 }}>
					<TestIcon state={questionState}></TestIcon>
				</div>

				<div style={{ flexGrow: 1, marginTop: 5, marginLeft: 8 }}>
					{ text }
					{ questionState === "active" ? questionsList : null}
				</div>

			</div>
		)
	}
}

export default ConceptCheck;
