import React from "react";
class Spring extends React.Component {
  render() {
    var p1 = this.props.p1
    var p2 = this.props.p2
    var path = pointsToSVGPath(springPath(p1, p2));
    return <path
             fill="transparent"
             stroke="black"
             strokeWidth = {1+Math.log10(this.props.k)}
             d={path}
             />;

    function pointsToSVGPath(data) {
      var svgPathArray = ['M',data[0].x, data[0].y];
      for(var i = 1; i<data.length; i++){
        if(data[i].hasOwnProperty('mx')){
          svgPathArray.push('M',data[i].mx,data[i].my);
        }
        if(data[i].hasOwnProperty('x')){
          svgPathArray.push('L',data[i].x,data[i].y);
        }
        if(data[i].hasOwnProperty('c1x')){
          svgPathArray.push('C');
          svgPathArray.push(data[i].c1x,data[i].c1y);
          svgPathArray.push(data[i].c2x,data[i].c2y);
          svgPathArray.push(data[i].c3x,data[i].c3y);
        }
      }
      return svgPathArray.join(' ');
    }

    function springPath(x1,y1,x2,y2){
      var x1 = p1.x;
      var y1 = p1.y;
      var x2 = p2.x;
      var y2 = p2.y;
      var w = 20;
      var L = Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2))
      var l = 0.6*L;
      var n = 5;
			var dx = l/n*(x2-x1)/L;
			var dy = l/n*(y2-y1)/L;
			var vx = w*(y2-y1)/L
			var vy = w*(x1-x2)/L
			var g1 = {x:(L-l)/(2*L)*(x2-x1)+x1, y:(L-l)/(2*L)*(y2-y1)+y1}
			var g2 = {x:x2-(L-l)/(2*L)*(x2-x1), y:y2-(L-l)/(2*L)*(y2-y1)}
			var data = [{x:x1,y:y1}, g1]
			for(var i=0; i<n; i++){
				data.push({x:(L-l)/(2*L)*(x2-x1)+x1+i*dx+0.25*dx+vx,y:(L-l)/(2*L)*(y2-y1)+y1+i*dy+0.25*dy+vy},
					{x:(L-l)/(2*L)*(x2-x1)+x1+i*dx+0.75*dx-vx,y:(L-l)/(2*L)*(y2-y1)+y1+i*dy+0.75*dy-vy});
			}
			data.push(g2,{x:x2,y:y2})

			return data;
		}
  }
}
export default Spring;
