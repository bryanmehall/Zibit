import React from 'react'
import Path from './Path'

export const colors = {
	red: "rgb(244, 47, 47)",
	green: "rgb(88, 222, 88)",
	blue: "rgb(47, 47, 244)",
	light: "#eee",
	dark: "#666"
}

export const cardStyle = {
	fontFamily: '"Roboto", sans-serif',
	fontWeight: "500",
	fontSize: 15,
	margin: 5,
	position: 'absolute',
	MozBoxSizing: "border-box",
	boxSizing: "border-box",
	borderRadius: 3,
	boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.8)"
}

export const linkStyle = {
	fontFamily: '"Roboto Condensed", sans-serif',
	fontWeight: "500",
	color:"#ccc",
	cursor: 'pointer',
	fontSize: 15,
	textDecoration: 'none'
}

export const mathTextStyle = {
	fontFamily: 'MathJax_Main,"Times New Roman",Times,serif',
	fontSize: "1.6em",
	letterSpacing: "2px",
	WebkitTouchCallout: "none",
	WebkitUserSelect: "none",
	MozUserSelect: "none"
}

export const mathVarStyle = {
	fontStyle: "italic",
	fontFamily: 'MathJax_Main,"Times New Roman",Times,serif',
	fontSize: "1.6em",
	letterSpacing: "2px",
	WebkitTouchCallout: "none",
	WebkitUserSelect: "none",
	MozUserSelect: "none"
}
export const axisLabelStyle = {
    fontFamily: "helvetica",
    fontSize:12,
    textAnchor:"middle",
    alignmentBaseline:"middle",
    cursor: "default",
}
export const headerStyle = {
	fontSize:20,
	color : '#eee',
	//textAlign: 'center',
	padding:20
}

export const displayValue = (value) => {
	//const precision = this.props.precision || Math.min(3,Math.max(Math.log10(Math.abs(value)+2),1))
    //if (quantity = 't') {console.log('t',Math.log10(Math.abs(value)+2))}
    //because the default toPrecision function is just bad
    //converts scientific notation while keeping trailing zeroes
    const toPre = value.toPrecision(2)
    const displayValue = (toPre.indexOf('e') === -1) ?  toPre : parseFloat(toPre)
	return displayValue

}

export const Arrow = ({ length, width, tipWidth, aspectRatio, doubleSided }) => {
	const l = doubleSided ? length/2 : length
	const w = width
	let tw = tipWidth || 2 * width
	const ar = aspectRatio || Math.sqrt(3)

	if (Math.abs(l)<tw/ar){
		tw = Math.abs(l)*ar
	}

	var tipL = tw/ar*Math.sign(l)
	const points = [
		{ x: 0, y: -w/2 },
		{ x: l-tipL, y: -w/2 },
		{ x: l-tipL, y: -tw/2 },
		{ x: l, y: 0 },
		{ x: l-tipL, y: tw/2 },
		{ x: l-tipL, y: w/2 },
		{ x: 0, y: w/2 }
	]
	if (doubleSided){
		return (
			<g>
				<Path points={points} fill="#ccc" strokeColor="none"/>
				<Path transform=" scale(-1)" points={points} fill="#ccc" strokeColor="none"/>
			</g>
		)

	} else {
		return <Path points={points} fill="#ccc" strokeColor="none"/>
	}

}


