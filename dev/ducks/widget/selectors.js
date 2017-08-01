import {
	createSelectors
}
from 'reselect'
import {
	getSymbol
}
from '../quantity/selectors'


const getWidget = function (state, id) {
	const widgetState = state.sim.widget
	try {
		var widgetData = Object.assign({}, widgetState[id])
	widgetData.props.id = id
	} catch (e){
		throw new Error("could not find widget named "+id)
	}

	return widgetData
}
export const getActive = function (state, name) {
    const widgetData = getWidget(state, name)
	return widgetData.props.active
}
export const getProp = function(state, name, prop){
	const widgetData = getWidget(state, name)
	return widgetData.props[prop]
}

export const getExpressionChildren = function (state, id) {
	var widgetData = getWidget(state, id)
	var type = widgetData.type
	var props = widgetData.props
	var valueProps = {
		key: id,
		symbol: getSymbol(state, props.quantity),
		quantity: props.quantity
	}
	var children = widgetData.children
	return {
		type: type,
		props: valueProps,
		children: children
	}
}

export const getChildren = function (state, id) {
	var widgetData = getWidget(state, id)
	var children = widgetData.children
	var childData = children.map(function (childId) {
		return getWidget(state, childId)
	})
	return childData
}
