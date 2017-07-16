/*
state Shape:
	content:{
		activeCourse: "controlStystems"
		activePart: "simpleharmonicoscilator"
		activeBlock: {
			id: "damping"
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
		blocks:[
			{
				id:damping
				complete: false
				Title:"damping"
				}
				text:"adjust damping ratio
			}
		]
	},
	sim:{
		quantity     	//quantity reducers
		widget			//widgetreducers
	}
*/


export { default as sim } from "./sim"
export { default as content } from "./content"

