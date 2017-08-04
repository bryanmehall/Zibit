//possibly turn this into a filters component file
import React from 'react'

export const HighlightFilter = ({color, id}) => (
	<defs>
		<filter id={id} primitiveUnits="userSpaceOnUse">
			<feMorphology operator="dilate" radius="1.5" in="SourceAlpha" result="expanded"/>
			<feFlood floodColor={color} result="highlightColor"/>
			<feComposite in="highlightColor" in2="expanded" operator="in" result="expandedColored" />
			<feGaussianBlur stdDeviation="2" in="expandedColored" result="highlight"/>
			<feComposite operator="over" in="SourceGraphic" in2="highlight"/>
		</filter>
	</defs>
)

export const DropShadow = () => (
	<defs>
		<filter id="dropShadow">
			<feOffset result="offOut" in="SourceAlpha" dx="0.5" dy="1" />
			<feGaussianBlur result="blurOut" in="offOut" stdDeviation="1" />
			<feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
		</filter>
	</defs>
)
