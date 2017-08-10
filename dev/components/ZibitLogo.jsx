import React from 'react'

export default class ZibitLogo extends React.Component {
  render() {
	  const r = 1.6180339 //ratio of height to width --this is correct for 5/4 but broken otherwise
	  const w = this.props.width || 22//width
	  const h = w*r //height
	  const t = w/3.5 //thickness
	  const topColor ="#0e759c"
	  const diagonalColor="#382a72"
	  const bottomColor = "#26840b"
	  const diagonalOpacity = 0.8

	  const pos = this.props.pos || { x: 0, y: 0 }
	  const slope = h/(w-t*r)
	  const dt = Math.sqrt(t*t+(t/slope)*(t/slope))
	  const topPath = 'M0 0 L'+w+' 0L'+(w-t/slope-w/30)+' '+t+'L0 '+t
	  const diagonalPath = 'M'+(w-dt)+' 0L'+w+' 0L'+dt+' '+h+'L0 '+h

	  const top = (
		  <path
			  d={topPath}
			  fill={topColor}
			  />
	  )//top bar
      const diagonal = (
		  <path
              fill={diagonalColor}
              opacity={diagonalOpacity}
              d={diagonalPath}/>
	  )
       const whiteMask = (
		   <path
			   fill="#f66"
			   d={diagonalPath}
			   />
	   )
       const bottom = (
		   <path
                  d={topPath}
                      fill={bottomColor}
                  transform={'translate('+w+','+h+') rotate(180)'}
                      />)
	   const text = (
		   <text
			   x={w*14.115/15}//14.115/15 to make touching
			   fontFamily='"Yanone Kaffeesatz", sans-serif'
			   y={h}
			   fontSize={h}
			   fill='#0e759c'
			   >
			   ibit
		   </text>
	   )
    return (
      <svg width={w*2.6} height={h+10}>
		<g transform={'translate('+pos.x+','+pos.y+')'}>
        {whiteMask}
        {top}
        {bottom}
        {diagonal}
		{text}
       </g>
		</svg>
    )
  }
}
