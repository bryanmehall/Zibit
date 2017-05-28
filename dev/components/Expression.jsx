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
		this.offset = 0
	}
	getWidth(bbox){
		console.log(bbox)
		this.offset += bbox.width

	}

	componentDidMount(){
	}

	render(){
		console.log('rendering expression')
		var self = this
		var childTypes = {
			Expression,
			Value
		}
		function createChild(childData){
			var type = childTypes[childData.type]
			var props = childData.props
			props.key = props.id
			props.pos = {x:100, y:100}
			props.ref = (elem) => {
				console.log('rendering child',elem.props, self.offset)
				elem.props.pos.x = self.offset
			}
			props.isSubExpression = true
			props.getWidth = self.getWidth
			return React.createElement(type, props)
		}

		var children = this.props.childData.map(createChild)
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
