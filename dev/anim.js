import keyframeActions from './keyframeActions'
export const audio = new Audio("/courses/controlsystems/dho/intro.mp3")

var keyframes = [
	{
		"time": 2,
		"dt": 0,
		"actions": [
			{
				"type": "fadeWidgetIn",
				"dur": 1,
				"params": {
					"name": "gForceVector",
					"type": "Vector",
					"parent": "pendulumPlot",
					"props": {
						"tailX": "bobX",
						"tailY": "bobY",
						"x": "fg_x",
						"y": "fg_y",
						"opacity": 0
					},
					"children": [

					]
				},
				"interp": "linear"
			}
		]
	},
	{
		"time": 4,
		"dt": 0,
		"actions": [
			{
				"type": "fadeWidgetOut",
				"dur": 1,
				"params": {
					"name": "gForceVector",
					"type": "Vector",
					"parent": "pendulumPlot",
					"props": {
						"tailX": "bobX",
						"tailY": "bobY",
						"x": "fg_x",
						"y": "fg_y",
						"opacity": 0
					},
					"children": [

					]
				},
				"interp": "linear"
			}
		]
	},
	{
		"time": 1,
		"dt": 0,
		"actions": [
			{
				"type": "tweenProperty",
				"dur": 0.2,
				"params": {
					"objectName": "pendulum",
					"propName": "stringHighlight",
					"initValue": 0,
					"finalValue": 1
				},
				"interp": "linear"
			}
		]
	},
	{
		"time": 3,
		"dt": 0,
		"actions": [
			{
				"type": "tweenQuantity",
				"dur": 1,
				"params": {
					"quantityName": "theta0",
					"initValue": 0,
					"finalValue": 0.5
				},
				"interp": "linear"
			}
		]
	},
	{
		"time": 6,
		"dt": 0,
		"actions": [
			{
				"type": "tweenQuantity",
				"dur": 6,
				"params": {
					"quantityName": "t",
					"initValue": 0,
					"finalValue": 6
				},
				"interp": "linear"
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
