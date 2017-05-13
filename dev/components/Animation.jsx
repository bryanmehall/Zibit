import React from "react";

class Animation extends React.Component {
	constructor(props){
		super(props)
	}

	render() {
		console.log('play', this.props.playing)
		var self = this
		var pause = "M11,10 L18,13.74 18,22.28 11,26 M18,13.74 L26,18 26,18 18,22.28"
		var play = "M11,10 L17,10 17,26 11,26 M20,10 L26,10 26,26 20,26"
		var fromPath = this.props.playing ? pause : play
		var toPath = this.props.playing ? play : pause
		console.log(fromPath)
		return (
			<path
				d={toPath}
				pointerEvents="bounding-box"
				fill='gray'
				onClick={function(){self.props.onClick(!self.props.playing)}}
				>

				<animate
					from={fromPath}
					to={toPath}
					begin="click"
					attributeType="XML"
					attributeName="d"
					fill="freeze"
					keySplines=".4 0 1 1"
					repeatCount="1"
					dur=".2s"
					></animate>
			</path>
		)
	}
}
export default Animation
