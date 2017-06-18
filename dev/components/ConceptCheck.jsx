import React from 'react';


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

		const icons = {
			completed: (
				<g transform = "translate(20,20) scale(2)">
					<path d="M-5,0 L-2,3 L5,-4" strokeWidth={2.5} fill="none" stroke="#58de58"></path>
				</g>
			),

			active: (
				<g transform = "translate(20,20) scale(1.1)">
					<circle cx={0} cy={0} r={10} fill="rgb(88, 88,222)"/>
					<text
						x={0}
						y={1}
						fill="#fff"
						fontSize= {15}
						textAnchor= "middle"
						alignmentBaseline="middle"
						style={textStyle}
						>?</text>
				</g>
			),

			inactive: (
				<g transform="translate (20,20)">
					<circle cx={0} cy={0} r={10} stroke="#ccc" strokeWidth={2} fill="none"/>
				</g>
			)
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
					<svg width={40} height={40} viewBox="0 0 40 40" >
					{icons[questionState]}
				</svg>
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
