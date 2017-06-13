var keyframes = [
	{
		time: 1,
		actions: [
			{
				type: "fadeWidgetIn",
				dur: 1,
				params: {
					type: 'Plot',
					name: 'testPlot',
					parent: "SmdApp",
					interp: 'cubic' //make cubic default
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

var tweens = keyframes.reduce(keyframesToActions, [])


var actions = {
	fadeWidgetIn: {
		enter: function (t, tweenData) {
			console.log('fading widget', tweenData)
		},
		tween: function () {
			console.log('tweening widget')
		},
		exit: function () {}
	}
}

export const getActiveTweens = (prevFrameTime, time) => ({
	enter: tweens.filter((tween) => (prevFrameTime < tween.start && time >= tween.start)),
	tween: tweens.filter((tween) => (prevFrameTime > tween.start && time > tween.start && time < tween.end)),
	exit: tweens.filter((tween) => (prevFrameTime < tween.end && time >= tween.end))
})

export const tween = function (activeTweens, t) {
		activeTweens.enter.forEach(function (tween) {
			actions[tween.type].enter(t, tween)
		})
		activeTweens.tween.forEach(function (tween) {
			actions[tween.type].tween(t, tween)
		})
		activeTweens.exit.forEach(function (tween) {
			actions[tween.type].exit(t, tween)
		})
	}
	//console.log('0,0', getActiveTweens(0, 0))
	//console.log('0.5,1.5', getActiveTweens(0.5, 1.5))
	//console.log('1.5,1.6', getActiveTweens(1.5, 1.6))
	//console.log('1.6,2.5', getActiveTweens(1.6, 2.5))
