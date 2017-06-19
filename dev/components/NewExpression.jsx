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
	}

    componentDidMount(){

	}

	render(){
		var self = this

		var childTypes = {
			NewExpression,
			NewValue
		}

		function createChild(childData,i){
			var type = childTypes[childData.type]
			var props = childData.props
			props.key = props.id
			props.isSubExpression = true
			return React.createElement(type, props)
		}
		//define children in order to get widths and in reverse order for rendering

        this.children = this.props.childData.map(createChild)


		var pos = this.props.pos
		//if (this.props.isSubExpression){
		//	return (
		//		<tspan>
		//			{children}
		//		</tspan>
		//	)
		//} else {
			return (//render children with refs first
                <g>
                    <text transform={'translate('+pos.x+','+pos.y+')'} >
                        {this.children}
                    </text>
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
