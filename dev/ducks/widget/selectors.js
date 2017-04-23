import {createSelectors} from 'reselect'


const getWidget = function (state, id){
	var widgetData = Object.assign({}, state.widgets[id])
	widgetData.props.id = id
	return widgetData
}

export const getChildren = function(state, id){
	var widgetData = getWidget(state, id)
	var children = widgetData.children
	var childData = children.map(function(childId){
			return getWidget(state, childId)
	})
	return childData
}

