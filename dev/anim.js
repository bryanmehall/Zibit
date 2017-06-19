import QuantityActions from './ducks/quantity/actions'
import WidgetActions from './ducks/widget/actions'
import keyframeActions from './keyframeActions'
export const audio = new Audio("./content/controlSystems/dho/dho1.mp3")


const contentGroup = {
	id: "dho",
	title: "Part 02: Damped Harmonic Oscilator",
	contentBlocks: ["adjustDamping"]
}
const contentBlock = {
	id: "adjustDamping",
	initialState: {},//initial state of store goes here
	completed: false,
	audio: "./audio/dho1.mp3",
	tests: [
		{ test: "isEqual", id: "zeroDamping", params: { quantity: 'c', value: 0 }, text: "adjust the damping coefficient so the ", helpBlocks: [] }
	],
	onTestsComplete: { action: 'goTo', contentBlock: "zeta" }
}

var keyframes = [
	{ //make keyframes relative to each other to that a change in one shifts all--maybe also have a time so that it can be set absolutely
		time: 1,
		dt: 0, //time overrides dt
		actions: [
			{
				type: "fadeWidgetIn",
				dur: 1,
				params: {
					name: 'posPlot',
					type: 'Plot',
					parent: 'app',
					props: {
						xVar: 't',
						yVar: 'y',
						xVars: ['t'],
						yVars: ['y'],
						width: 300,
						height: 350,
						pos: { x: 350, y: 400 }
					},
					children: ['abstraction1']
				},
				interp: 'linear' //make cubic default
			}
		]
	},
	{
		time: 5,
		actions: [
			{
				type: "askQuestion",
				params: {
				}
			}
		]
	}
]

//transform keyframes into a list of actions and their start-end times --could be part of the build process
function keyframesToActions(actions, keyframe) {
	function addStartEnd(action) {
		var t0 = keyframe.time
		return Object.assign(action, {
			start: t0,
			end: t0 + action.dur
		})
	}
	var newActions = keyframe.actions.map(addStartEnd)
	return actions.concat(newActions)
}

const tweens = keyframes.reduce(keyframesToActions, [])//do at compile time


/* possible frame and start/end time spacing
  start    end      stages
1 2 |       |     	none
  1 |   2   |		start, tween
  1 |       | 2		start,  end, tween
    |  1 2  |		tween
	|   1   | 2		end + tween
	|       | 1 2   none
backwards
2 1 |       |     	none
  2 |   1   |		end + tween
  2 |       | 1		start then end
    |  2 1  |		tween
	|   2   | 1		start + tween
	|       | 2 1   none
*/

export const getActiveTweens = (tp, t) => {
	//previous time and time
	var playingForward = t >= tp
	var activeTweens = tweens.filter((tween) => (!(tp < tween.start && t < tween.start || tp > tween.end && t > tween.end)))
	return activeTweens.map((tween) => {
		var stage = 'tween'
		if (playingForward) { //order is important so it goes start end tween
			if (t > tween.end) {
				stage = 'end'
			}
			if (tp < tween.start) {
				stage = 'start'
			}
		} else { //handle case for both?
			if (tp > tween.end) {
				stage = 'start'
			}
			if (t < tween.start) {
				stage = 'end'
			}
		}
		return Object.assign({}, tween, {
			playingForward, stage
		})
	})
}



export const tween = function (store, activeTweens, t) {
	activeTweens.forEach((tween) => {
		if (tween.hasOwnProperty('dur')){//if tween has duration
			if (tween.playingForward) {
				keyframeActions[tween.type][tween.stage](store, t, tween)
				keyframeActions[tween.type]['tween'](store, t, tween)
			} else {
				var inverseType = keyframeActions[tween.type].inverse
				keyframeActions[inverseType][tween.stage](store, t, tween)
			}
		} else {
			keyframeActions[tween.type](store,t,tween)
		}


	})
}
