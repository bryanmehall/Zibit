import React from 'react'
import { getTransformString } from '../utils/point'
export const UpArrow = ({ width=12, active }) => (
	<svg width={width} height={width/2} viewBox="-5 -5 10 5" style={{margin:"auto", display:'block', bottom:-10}}>
		<path
			d="M5 0L0 -5L-5 0Z"
			fill="#ccc"
			stroke="none"
			>
		</path>
	</svg>
)
export const DownArrow = ({ width=12, active }) => (
	<svg width={width} height={width/2} viewBox="-5 0 10 5" style={{margin:"auto", display:'block', bottom:-10}}>
		<path
			d="M5 0L0 5L-5 0Z"
			fill="#ccc"
			stroke="none"
			>
		</path>
	</svg>
)

export const completed = (
	<svg width={40} height={40} viewBox="0 0 40 40" >
        <g transform = "translate(20,20) scale(2)">
			<path
			d="M-5,0 L-2,3 L5,-4"
			strokeWidth={2.5}
			fill="none"
			stroke="#58de58"
			></path>
		</g>

    </svg>
)
//fill="#2f2ff4"
export const active = (
	<svg width={40} height={40} viewBox="0 0 40 40" >
		<g transform="translate (11,11)">
			<path
				fill="#5858de"
				d="m11-0.012817c-6.0751,0-11,4.9249-11,11s4.9249,11,11,11,11-4.9249,11-11c0-6.0749-4.925-11-11-11zm0.0625,3.5625c1.2933,0,2.3204,0.3692,3.0938,1.0625,0.77332,0.6933,1.1562,1.6079,1.1562,2.7812-0.00001,0.6134-0.12168,1.163-0.375,1.6563-0.24001,0.4933-0.52834,0.9167-0.875,1.25-0.34668,0.32-0.70251,0.6308-1.0625,0.9375-0.34667,0.2933-0.65292,0.6446-0.90625,1.0312-0.24001,0.3734-0.34376,0.7609-0.34375,1.1876v0.9374h-1.8125v-1.0937c-0.0000048-0.4933,0.135-0.9662,0.375-1.4063,0.25333-0.4399,0.52833-0.8049,0.875-1.125,0.35999-0.3199,0.71583-0.6487,1.0625-0.9687,0.34666-0.32,0.63499-0.6625,0.875-1.0625,0.25332-0.4133,0.40624-0.8771,0.40625-1.3438-0.000008-0.6799-0.25209-1.2116-0.71875-1.625-0.46667-0.4266-1.0704-0.6562-1.8438-0.6562-0.97334,0-1.6579,0.2971-2.0312,0.8438-0.37334,0.5466-0.5625,1.2945-0.5625,2.2812h-1.6875c-0.0000015-1.5333,0.36041-2.6821,1.0938-3.4688,0.74666-0.7999,1.8412-1.2187,3.2812-1.2187zm-1.125,12.75,1.8125,0,0,2.0937-1.8125,0,0-2.0937z"
			/>
		</g>
	</svg>

)

export const inactive = (
    <svg width={40} height={40} viewBox="0 0 40 40" >
        <circle cx={20} cy={20} r={10} stroke="#de5858" strokeWidth={2} fill="none"/>
    </svg>
)

export const TestIcon = ({ state }) => {
	if (state === "inactive") {
		var icon = inactive
	} else if (state === 'active'){
		var icon = active
	} else {
		var icon = completed
	}
	return (
			icon
	)
}
export const LabIcon = ({}) => (
	<svg width={40} height={40} viewBox="0 0 40 40" >
		<path
			d='
				M20 2
			   	L25 2
				A1 1 1 0 1 25 4
				L25 12
				L35 35
				'

			stroke='black'
			strokeWidth = {1}
			fill='none'
		/>
	</svg>
)
export const pause = (
		<g transform = "translate(8,8) scale(1.2)">
			<path
				d= "M0,0 L7,0 7,20 0,20 M11,0 L18,0 18,20 11,20"
				fill="#888"
			/>
		</g>
)

export const play = (
		<g transform = "translate(8,8) scale(1.2)">
			<path
				d= "M0,0 L9,5 9,15 0,20 M9,5 L18,10 18,10 9,15"
				fill="#888"
			/>
		</g>
)

export const Anim = ({ state, onClick, onMouseOver, onMouseOut }) => {
	let icon
	if (state === "playing") {
		icon = pause
	} else if (state === 'paused'){
		icon = play
	} else {
		icon = completed
	}
	return (
		<svg
			width={40}
			height={40}
			viewBox="0 0 40 40"
			onClick={onClick}
			>
			{icon}
		</svg>
	)
}

