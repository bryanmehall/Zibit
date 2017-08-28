//possibly turn this into a filters component file
import React from 'react'
/*primitiveUnits="userSpaceOnUse"
x="-50%"
			y="-50%"
			width="200%"
			height="200%"*/
export const HighlightFilter = ({color, id, strength}) => {
	const radius = (strength !== undefined)? strength : 3
	return (
		<defs>
			<filter
				id={id}
				x={-50}
				y={-50}
				width={150}
				height={100}
				>
				<feMorphology
					operator="dilate"
					radius={radius/2}
					in="SourceAlpha"
					result="expanded"
					/>
				<feFlood
					floodColor={color}
					result="highlightColor"
					/>
				<feComposite
					in="highlightColor"
					in2="expanded"
					operator="in"
					result="expandedColored"
					/>
				<feGaussianBlur
					stdDeviation={strength}
					in="expandedColored"
					result="highlight"
					/>
				<feComposite
					operator="over"
					in="SourceGraphic"
					in2="highlight"
					/>
			</filter>
		</defs>
	)
}
export const DropShadow = () => (
	<defs>
		<filter id="dropShadow">
			<feOffset result="offOut" in="SourceAlpha" dx="0.5" dy="1" />
			<feGaussianBlur result="blurOut" in="offOut" stdDeviation="1" />
			<feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
		</filter>
	</defs>
)
