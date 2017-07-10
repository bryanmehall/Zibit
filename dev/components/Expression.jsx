import React from "react"
import ValueOverlay from './ValueOverlay'
import ReactDOM from "react-dom"
import {connect} from "react-redux"
import { bindActionCreators } from 'redux'
import QuantityActions from '../ducks/quantity/actions'
import {getChildren} from '../ducks/widget/selectors'
import Value from './Value'
import EqText from './EqText'

class Expression extends React.Component{
	constructor(props){
		super(props)
        this.updatebboxes = this.updatebboxes.bind(this)
        this.callUpdate = this.callUpdate.bind(this)
        this.needsUpdate = true
		this.bboxes = {}
	}
    updatebboxes(){
        const expression = this
        if (this.needsUpdate){
            Object.keys(this.refs).forEach((id) => {
                const domElement = ReactDOM.findDOMNode(expression.refs[id])
                const extent = domElement.getExtentOfChar(0)//use SVG v1.1
                const length = domElement.getComputedTextLength()
                const bbox = { x: extent.x, y: extent.y, height: extent.height, width: length }

                expression.bboxes[id] = bbox

            })

            this.forceUpdate() //need to update other bboxes when one updates
        }
        this.needsUpdate = false
    }
    callUpdate(){
        this.needsUpdate = true
    }
    componentDidMount(){
        this.updatebboxes()
	}
    componentDidUpdate(){

        this.updatebboxes()
    }

	render(){
		const self = this
		const childData = this.props.childData
		const pos = this.props.pos
		const activeElements = this.props.childData.filter((child) => (child.props.active))

		var childTypes = {
			Expression,
			Value,
			EqText
		}

		function createChild(childData,i){
			var type = childTypes[childData.type]
			var props = childData.props
			props.key = props.id
            props.ref = props.id
            props.callUpdate = self.callUpdate
			props.index = i
			props.isSubExpression = true
			return React.createElement(type, props)
		}
        function createOverlays(childData){
            if (childData.props.quantity !== undefined){ //if a quantity component --could swallow errrors?
                const active = childData.props.active
                const id = childData.props.id
                const bbox = self.bboxes[id]
                const quantity = childData.props.quantity
                return (bbox === undefined) ? null : <ValueOverlay quantity={quantity} active={active} id={id} key={id} bbox={bbox}/>
            } else {return null}
        }

        this.children = this.props.childData.map(createChild)
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
                        {this.children}
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
)(Expression);
