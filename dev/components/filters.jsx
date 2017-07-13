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
