import WidgetActions from './ducks/widget/actions'
import QuantityActions from './ducks/quantity/actions'



	//start and inverse.end must be opposites ie enter then exit is noop
const fadeWidgetIn = {
	inverse: "fadeWidgetOut",
	start: function (store, t, tweenData) {
		var params = tweenData.params
		store.dispatch(WidgetActions.addWidget(params.name, params.type, params.props, params.children))
		store.dispatch(WidgetActions.addChild(params.name, params.parent))
	},
	tween: function (store, t, tweenData) {
		var alpha = (t - tweenData.start) / (tweenData.dur)
		store.dispatch(WidgetActions.setProp(tweenData.params.name, 'visibility', alpha))
	},
	end: function () {
		//console.log('end of fade in')
	}
}

const fadeWidgetOut = {
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

const askQuestion = function(){}


export default {
	fadeWidgetIn,
	fadeWidgetOut,
	askQuestion
}