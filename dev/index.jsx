import React from "react";
import ReactDOM from "react-dom";

import Axis from './components/Axis'
import Scale from './components/Scale'
import Slider from './components/Slider'

class App extends React.Component {
	constructor(props){
		super(props)
		this.state = {t:30}
	}
	render(){
		var scale = new Scale({min:-10, max:500, tMin:100, tMax:300})
		var app = this
		var valueChange = function(value){
			app.setState({t:value.value})
		}
		return (
			<svg height={400} width={400}>
				<Axis scale={scale} pos={100} showBar={true}/>
				<Slider 
					scale={scale}
					value={this.state.t} 
					pos={20}
					valueChange={valueChange}/>
			</svg>
		)
		
	}
}

ReactDOM.render(
	<App/>,
	document.getElementById('container')
)

