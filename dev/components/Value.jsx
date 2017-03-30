class Value extends React.Component {
  constructor(props){
    super(props)
    //this.handleClick = this.handleClick.bind(this);
  }
  handleClick(e){
    var bbox = this.refs.text.getDOMNode().getBBox()
    console.log('bbox', bbox)
    this.props.select(bbox)
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
                 refs="text"
                 x={this.props.pos.x}
                 y={this.props.pos.y}
                 ref="text"
                 >{this.props.symbol}</text>
    
    
    return text
  }
}