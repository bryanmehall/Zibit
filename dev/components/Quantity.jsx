import React from "react";
import ReactDOM from "react-dom";
import Scale from './Scale'
import Slider from './Slider'

class Quantity extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			highlighted:false
		}
		
	}

	render(){
		return (
			<g>
				{this.props.children}
			</g>
		)
	}
}

export default Quantity;