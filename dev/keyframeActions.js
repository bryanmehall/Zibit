import WidgetActions from './ducks/widget/actions'
import QuantityActions from './ducks/quantity/actions'



//start and inverse.end must be opposites ie enter then exit is noop
const fadeWidgetIn = {
	inverse: "fadeWidgetOut",
	start: function (store, t, tweenData) {
		var params = tweenData.params
		store.dispatch(WidgetActions.addWidget(params.name, params.type, params.props, params.children, params.parent))
		store.dispatch(WidgetActions.addChild(params.name, params.parent))
	},
	tween: function (store, t, tweenData) {
		var alpha = (t - tweenData.start) / (tweenData.dur)
		store.dispatch(WidgetActions.setProp(tweenData.params.name, 'opacity', alpha))
	},
	end: function () {
		//console.log('end of fade in')
	}
}

const fadeWidgetOut = {
	inverse: "fadeWidgetIn",
	start: function (store, t, tweenData) {},
	tween: function (store, t, tweenData) {
		const alpha = 1+(tweenData.start - t) / (tweenData.end - tweenData.start)
		store.dispatch(WidgetActions.setProp(tweenData.params.name, 'opacity', alpha))
	},
	end: function (store, t, tweenData) {
		var params = tweenData.params
		store.dispatch(WidgetActions.removeChild(params.name, params.parent))
        //store.dispatch(WidgetActions.removeWidget(params.name))
	}
}
const tweenNumber = (timeFraction, initValue, finalValue) => (
    timeFraction*(finalValue-initValue)+initValue
)
const tweenProperty = {
	inverse: "tweenProperty",
	start: (store, t, tweenData) => {},
	tween: (store, t, tweenData) => {
		const { initValue, finalValue, objectName, propName } = tweenData.params
		const timeFraction = (t-tweenData.start)/(tweenData.end-tweenData.start)

        const value = finalValue.hasOwnProperty('x') ? //if is a position
            {
                x: tweenNumber(timeFraction, initValue.x, finalValue.x),
                y: tweenNumber(timeFraction, initValue.y, finalValue.y)
            }:
            tweenNumber(timeFraction, initValue, finalValue)
		store.dispatch(WidgetActions.setProp(objectName, propName, value))
	},
	end: (store, t, tweenData) => {
		const { finalValue, name, prop } = tweenData.params
		store.dispatch(WidgetActions.setProp(name, prop, finalValue))
	}
}
const tweenQuantity = {//this should be combined with tween property
	inverse: "tweenQuantity",
	start: (store, t, tweenData) => {},
	tween: (store, t, tweenData) => {
		const { initValue, finalValue, quantityName } = tweenData.params
		const timeFraction = (t-tweenData.start)/(tweenData.end-tweenData.start)
		const value = timeFraction*(finalValue-initValue)+initValue
		store.dispatch(QuantityActions.setValue(quantityName, value))
	},
	end: (store, t, tweenData) => {
		const { finalValue, quantityName } = tweenData.params
		store.dispatch(QuantityActions.setValue(quantityName, finalValue))
	}
}

//interpolation functions
const interp = {
	linear: (t, startTime, endTime, startVal, endVal) => {

	},
	cubic: (t, startTime, endTime, startVal, endVal) => {

	}
}


export default {
	fadeWidgetIn,
	fadeWidgetOut,
	tweenProperty,
	tweenQuantity
}
