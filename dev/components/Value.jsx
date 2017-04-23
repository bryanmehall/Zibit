import React from "react";
import Slider from './Slider'
import {connect} from "react-redux"
import { bindActionCreators } from 'redux';
import QuantityActions from '../ducks/quantity/actions';
import {getValue, getQuantityData} from '../ducks/quantity/selectors'

class Value extends React.Component {
	constructor(props){
		super(props)
		this.mouseOver = this.mouseOver.bind(this)
		this.mouseOut = this.mouseOut.bind(this)
		this.textStyle = {
      		fontStyle: "italic",
			fontFamily:'MathJax_Main,"Times New Roman",Times,serif',
      		fontSize:"1.6em",
      		WebkitTouchCallout: "none",
      		WebkitUserSelect: "none",
      		MozUserSelect: "none"
    	}
	}
	mouseOver(){
		this.props.setHighlight(this.props.quantity, true)
	}
	mouseOut(){
		this.props.setHighlight(this.props.quantity, false)
	}

	componentWillMount(){
		var dummyElement = document.createElementNS( 'http://www.w3.org/2000/svg','text')
			dummyElement.textContent = this.props.symbol
			dummyElement.style = "font-style: italic; font-family:'MathJax_Main,Times,serif'; font-size:1.6em;"
			document.getElementById('hiddenSvg').appendChild(dummyElement)
			var width = dummyElement.getBBox().width
			this.props.getWidth(width, this.props.index)
	}

	render(){
		var filter = (this.props.highlighted) ? "url(#highlight)": null
		var text = (
			<text
				style={this.textStyle}
				x={this.props.pos.x}
				y={this.props.pos.y}
				ref="text"
				filter={filter}
				onMouseOver={this.mouseOver}
				onMouseOut={this.mouseOut}
			>
				{this.props.symbol}
			</text>
		)
    var overlay = <g>
        </g>
    
    if (this.props.selected){
		return <g>
			{text}
			{overlay}
		</g>
	} else {
		return text
	}
  }
}

function mapStateToProps(state, props) {
	var quantityData = getQuantityData(state, props.quantity)
	return {
		symbol: quantityData.symbol,
		independent:quantityData.independent,
		highlighted:quantityData.highlighted
	};
}

function mapDispatchToProps(dispatch) {
	return {
		setHighlight:(name,value) => {
			dispatch(QuantityActions.setHighlight(name, value))
		},
	};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Value);
