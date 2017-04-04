import React from "react";
class Expression extends React.Component{//should this be textbox??
  constructor(props){
    super(props)
  }

  render(){
    var pos = this.props.pos
    var children = this.props.children
    var exp = this
    var x = this.props.pos.x
    this.widths = []
    var newChildren = []
    children.forEach(function(child,i){
      var dummyElement = document.createElementNS( 'http://www.w3.org/2000/svg','text')
      dummyElement.textContent = child.props.symbol
      dummyElement.style = "font-style: italic; font-family:'MathJax_Main,Times,serif'; font-size:1.6em;"
      document.getElementById('hiddenSvg').appendChild(dummyElement)
      var width = dummyElement.getBBox().width
      newChildren.push(React.cloneElement(child, { key:i,pos:{x:x,y:25}}))
      x+=width
    })

    return (//render children with refs first
      <g>
        <g x={this.props.pos.x} y={this.props.pos.y} ref='expression'>
          {newChildren}
        </g>
      </g>
    )
  }
}
export default Expression;
