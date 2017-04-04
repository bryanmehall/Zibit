import React from "react";
import ReactDOM from "react-dom";

import Axis from './components/Axis'
import Scale from './components/Scale'
import Slider from './components/Slider'
import Spring from './components/Spring'
import Value from './components/Value'
import Quantity from './components/Quantity'

class App extends React.Component {
	constructor(props){
		super(props)
		this.state = {t:30}
	}
	render(){
		var scale = new Scale({min:-100, max:500, tMin:100, tMax:300})
		var app = this
		var valueChange = function(value){
			app.setState({t:value.value})
		}
		return (
			<div>
				<h2>Axis</h2>
				<svg height={80} width={400}>
					<Axis scale={scale} pos={20} showBar={true}/>

				</svg>
				<h2>Slider</h2>
				<svg height={80} width={400}>
					<Slider
						scale={scale}
						value={this.state.t}
						pos={20}
						valueChange={valueChange}/>
				</svg>

				<div>
					<h2>Spring</h2>
					<div>
						<b>Params:</b>
							<ul>
								<li>p1: CoordinatePoint</li>
								<li>p2: CoordinatePoint</li>
								<li>k: Quantity</li>
							</ul>
						<b>Callbacks:</b>
							<ul></ul>
						<b>Children:</b>
							<ul></ul>
					</div>
					<svg height={80} width={400}>
						<Spring
							p1={{x:30,y:30}}
							p2={{x:150,y:30}}
							k={20}
							/>
					</svg>
				</div>

				<div>
					<h2>Value</h2>
					<div>
						<b>Params:</b>
							<ul>
								<li>pos: CoordinatePoint</li>
								<li>symbol: string..change to arbitrary jsx?</li>
							</ul>
						<b>Callbacks:</b>
							<ul>updateValue(Quantity)</ul>
						<b>Children:</b>
							<ul></ul>
					</div>
					<svg height={80} width={400}>
						<Value
							pos={{x:30,y:30}}
							symbol="value"
							quantity={new Quantity()}
							valueChange={valueChange}
							selected={true}
							/>
					</svg>
				</div>



			</div>
		)
		
	}
}

ReactDOM.render(
	<App/>,
	document.getElementById('container')
)

