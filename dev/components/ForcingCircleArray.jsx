import React from "react";
class ForcingCircleArray extends React.Component {
  render(){
    var x = this.props.pos.x
    var y = this.props.pos.y
    var t = this.props.time
    var forceList = this.props.forcingTerms
    var circles = forceList.map(function(term){
      var theta = term.w*t+term.p
      var r = term.a

      var forcingCircle = <ForcingCircle
                            pos={{x:x,y:y}}
                            r={r}
                            theta={theta}
                            color={new Color(255,255,255,0.5)}/>
      var value = term.value(t)
      x += value.x
      y += value.y
      return forcingCircle
    })
    return <g>
      {circles}
    </g>
  }
}
export default ForcingArray;
