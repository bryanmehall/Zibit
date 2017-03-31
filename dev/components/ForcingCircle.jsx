import React from "react";
class ForcingCircle extends React.Component {
  render(){
    var xi = this.props.pos.x,
        yi = this.props.pos.y,
        theta = this.props.theta,
        r = this.props.r,
        xo = xi+r*Math.cos(theta),
        yo = yi+r*Math.sin(theta)
    return(
      <g>
        <circle //main circle
          r={r}
          cx={xi}
          cy={yi}
          style={{fill:this.props.color.toCss(), stroke:"gray",strokeWidth:"3"}}
          />
        <circle //result point
          r={5}
          cx={xo}
          cy={yo}/>
      </g>
    )
  }
}
export default ForcingCircle;
