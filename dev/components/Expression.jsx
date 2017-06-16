import React from "react"
import Value from './Value'
import ValueOverlay from './ValueOverlay'
import {connect} from "react-redux"
import { bindActionCreators } from 'redux'
import QuantityActions from '../ducks/quantity/actions'
import {getChildren} from '../ducks/widget/selectors'

class Expression extends React.Component{
	constructor(props){
		super(props)
		this.getWidth = this.getWidth.bind(this)
		this.childProps = []
		this.bBoxes = {}
		this.state = {subPositions:{}}
		this.offset = 0
	}

	getWidth(bbox, id){
		var newSubPositions = Object.assign(this.state.subPositions, {[id]:{x:this.offset, y:0}})
		this.offset += bbox.width
		this.bBoxes[id] = bbox
		this.setState(newSubPositions)
	}


	render(){
		var self = this
		var subPos = this.state.subPositions
		var positioned = !(Object.keys(subPos).length === 0 && subPos.constructor === Object)
		var childTypes = {
			Expression,
			Value
		}

		function createChild(childData,i){
			var type = childTypes[childData.type]
			var props = childData.props
			props.key = props.id
			props.pos = subPos[props.id]
			props.bbox = self.bBoxes[props.id]
			props.isSubExpression = true
			props.getWidth = self.getWidth
			return React.createElement(type, props)
		}
		//define children in order to get widths and in reverse order for rendering

		if (positioned){//if subPositins is empty
			var children = this.props.childData.map(createChild).reverse()
		} else {
			var children = this.props.childData.map(createChild)
		}

		var pos = this.props.pos
		//if (this.props.isSubExpression){
		//	return (
		//		<tspan>
		//			{children}
		//		</tspan>
		//	)
		//} else {
			return (//render children with refs first
				<g transform={'translate('+pos.x+','+pos.y+')'}>
						{children}
				</g>
			)
		//}

	  }
}


function mapStateToProps(state, props) {

	return {
		childData: getChildren(state, props.id)
	}
}

function mapDispatchToProps(dispatch) {
	return {
		/*setHighlight:(name, value) => {
			dispatch(QuantityActions.setHighlight(name, value))
		},
		setPlay:(name, value) => {
			dispatch(QuantityActions.setPlay(name, value))
		}*/
	};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Expression);
