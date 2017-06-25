import React from 'react'
import Path from './Path'

export const colors = {
	red: "rgb(244, 47, 47)",
	green: "rgb(88, 222, 88)",
	blue: "rgb(47, 47, 244)",
	light: "#eee",
	dark: "#666"
}

export const mathTextStyle = {
	fontFamily: 'MathJax_Main,"Times New Roman",Times,serif',
	fontSize: "1.6em",
	WebkitTouchCallout: "none",
	WebkitUserSelect: "none",
	MozUserSelect: "none"
}

export const mathVarStyle = {
	fontStyle: "italic",
	fontFamily: 'MathJax_Main,"Times New Roman",Times,serif',
	fontSize: "1.6em",
	WebkitTouchCallout: "none",
	WebkitUserSelect: "none",
	MozUserSelect: "none"
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


