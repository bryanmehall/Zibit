import QuantityActions from './ducks/quantity/actions'
import WidgetActions from './ducks/widget/actions'
export const audio = new Audio("http://www.sousound.com/music/healing/healing_01.mp3");

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
					parent: "app",
					props: {
						xVar: 's',
						yVar: 'y',
						xVars: ['s', 't'],
						yVars: ['y', 'x'],
						width: 200,
						height: 150,
						pos: {
							x: 200,
							y: 500
						},
						visibility: 1
					},
					interp: 'linear' //make cubic default
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
	//start and inverse.end must be opposites ie enter then exit is noop
	fadeWidgetIn: {
		inverse: "fadeWidgetOut",
		start: function (store, t, tweenData) {
			var params = tweenData.params
			store.dispatch(WidgetActions.addWidget(params.name, params.type, params.props))
			store.dispatch(WidgetActions.addChild(params.name, params.parent))
		},
		tween: function (store, t, tweenData) {
			var alpha = (t - tweenData.start) / (tweenData.dur)
			store.dispatch(WidgetActions.setProp(tweenData.params.name, 'visibility', alpha))
		},
		end: function () {
			//console.log('end of fade in')
		}
	},
	fadeWidgetOut: {
		inverse: "fadeWidgetIn",
		start: function (t, tweenData) {},
		tween: function (store, t, tweenData) {
			var alpha = (t - tweenData.start) / (tweenData.end - tweenData.start)
			store.dispatch(WidgetActions.setProp(tweenData.params.name, 'visibility', alpha))
		},
		end: function (store, t, tweenData) {
			var params = tweenData.params
			store.dispatch(WidgetActions.removeChild(params.name, params.parent))
				//store.dispatch(WidgetActions.removeWidget(params.name))

		}
	}
}

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
		if (tween.playingForward) {
			actions[tween.type][tween.stage](store, t, tween)
			actions[tween.type]['tween'](store, t, tween)
		} else {
			var inverseType = actions[tween.type].inverse
			actions[inverseType][tween.stage](store, t, tween)
		}

	})
}
