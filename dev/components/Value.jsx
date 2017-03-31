import React from "react";
import Slider from './Slider'
class Value extends React.Component {
  constructor(props){
    super(props)
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(e){
	  console.log('clicked')
  }
  render(){
    var textStyle = {
      fontStyle: "italic",
	    fontFamily:'MathJax_Main,"Times New Roman",Times,serif',
      fontSize:"1.6em",
      WebkitTouchCallout: "none",
      WebkitUserSelect: "none",
      MozUserSelect: "none"
    }
    var text = <text
                 style={textStyle}
                 x={this.props.pos.x}
                 y={this.props.pos.y}
                 ref="text"
				 onClick={this.handleClick}
                 >{this.props.symbol}
        </text>
    var overlay = <g>
          <Slider
			  scale={this.props.quantity.scale}
			  value={this.props.quantity.value}
			  pos={20}
			  valueChange={this.props.valueChange}/>
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
export default Value;
