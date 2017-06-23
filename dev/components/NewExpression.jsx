import React from "react"
import Value from './Value'
import ValueOverlay from './ValueOverlay'
import ReactDOM from "react-dom"
import {connect} from "react-redux"
import { bindActionCreators } from 'redux'
import QuantityActions from '../ducks/quantity/actions'
import {getChildren} from '../ducks/widget/selectors'
import NewValue from './NewValue'
import EqText from './EqText'

class NewExpression extends React.Component{
	constructor(props){
		super(props)
		this.getBBox = this.getBBox.bind(this)
		this.bboxes = {}
	}

    componentDidMount(){
        if (Object.keys(this.bboxes).length !== 0){
            this.forceUpdate() //force update when bounding boxes become available
            //############could cause problems when creatign new widgets equal to child elements.length?
        }
	}

	getBBox(bbox, key) {
		this.bboxes[key] = bbox
	}

	render(){
		const self = this
		const childData = this.props.childData
		const pos = this.props.pos
		const activeElements = this.props.childData.filter((child) => (child.props.active))

		var childTypes = {
			NewExpression,
			NewValue,
			EqText
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
        function createOverlays(childData){

            const active = childData.props.active
            const id = childData.props.id
            const bbox = self.bboxes[id]
            const quantity = childData.props.quantity
            return (bbox === undefined) ? null : <ValueOverlay quantity={quantity} active={active} id={id} key={id} bbox={bbox}/>
        }

        const children = this.props.childData.map(createChild)
        const overlays = this.props.childData.map(createOverlays)
        const blurmask = null

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
                        {children}
                    </text>
                    {blurmask}
					{overlays}
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
