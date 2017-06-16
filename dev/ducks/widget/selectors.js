import {
	createSelectors
}
from 'reselect'
import {
	getSymbol
}
from '../quantity/selectors'


const getWidget = function (state, id) {
	var widgetData = Object.assign({}, state.widgets[id])
	widgetData.props.id = id
	return widgetData
}
export const getActive = function (state, name) {
	return true
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
