import React from "react"
import Value from './Value'
import ValueOverlay from './ValueOverlay'
import ReactDOM from "react-dom"
import {connect} from "react-redux"
import { bindActionCreators } from 'redux'
import QuantityActions from '../ducks/quantity/actions'
import {getChildren} from '../ducks/widget/selectors'
import NewValue from './NewValue'



class NewExpression extends React.Component{
	constructor(props){
		super(props)
		this.getBBox = this.getBBox.bind(this)
		this.bboxes = {}
	}

    componentDidMount(){

	}

	getBBox(bbox, key) {

		this.bboxes[key] = bbox
	}

	render(){
		const self = this
		const childData = this.props.childData
		const pos = this.props.pos
		const activeElements = this.props.childData.filter((child) => (child.props.active))
		const active = activeElements[0]
		const activeQuantity = active.props.quantity
		const activeBbox = activeElements.length === 0 ? null : this.bboxes[active.props.id]//active bbox
		const renderActiveChild = typeof activeBbox !== "undefined"

		//console.log(renderActiveChild, activeElements.length, bbox)

		var childTypes = {
			NewExpression,
			NewValue
		}

		function createChild(childData,i){
			var type = childTypes[childData.type]
			var props = childData.props
			props.key = props.id
			props.index = i
			props.getBBox = self.getBBox
			props.isSubExpression = true
			return React.createElement(type, props)
		}


        this.children = this.props.childData.map(createChild)

		//if (this.props.isSubExpression){
		//	return (
		//		<tspan>
		//			{children}
		//		</tspan>
		//	)
		//} else {
			return (//render children with refs first
                <g transform={'translate('+pos.x+','+pos.y+')'}>
                    <text>
                        {this.children}
                    </text>
					{renderActiveChild ? <ValueOverlay quantity={activeQuantity} bbox={activeBbox}/> : null}
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
)(NewExpression);
