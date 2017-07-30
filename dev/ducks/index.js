/*
state Shape:
	content:{
		activeCourse: {
			id : "controlSystems"
			title: "Control Systems",
			parts:[
				"intro",
				"simpleharmonicoscillator",
				"dampedharmonicoscillator",
			]
		}

		activePart: {
			id:"simpleharmonicoscillator "
			title: Simple Harmonic oscillator
			blocks:[
					id:damping
			]
		}
		activeBlock: {
			id: "damping"
			complete: false
			Title:"damping"
			text:"adjust damping ratio
			anim:{//must be a quantity object
					"value": 0,
					"min": 0,
					"max": 28,
					"symbol": "dispT",
					"independent": true,
					"abstractions": 10,
					"animation": {
						"playing": false
					}
				},
			tests?
		}

	},
	sim:{
		quantity     	//quantity reducers
		widget			//widgetreducers
	}
*/


export { default as sim } from "./sim"
export { default as content } from "./content"

