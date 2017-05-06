import React, {PropTypes} from "react"
import {connect} from "react-redux"
import { bindActionCreators } from 'redux';
import * as QuantityActions from '../ducks/quantity/actions';
import {getValue} from '../ducks/quantity/selectors'
import {getChildren} from '../ducks/widget/selectors'
import Scale from './Scale'
import Slider from './Slider'
import Plot from './Plot'
import Abstraction from './Abstraction'
import Expression from './Expression'
import Value from './Value'

class SmdApp extends React.Component {
	constructor(props){
		super(props)
	}
	render(){
		const { actions } = this.props;
		var childTypes = {
			"Plot": Plot
		}

		function createChild(childData){
			var type = childTypes[childData.type]
			var props = childData.props
			props.key = props.id
			var children = childData.children
			return React.createElement(type, props, children)
		}
		var children = this.props.childData.map(createChild)
		var app = this
		return (
			<svg width={700} height={600}>
			<defs>
				<filter id="highlight" primitiveUnits="userSpaceOnUse">
					<feMorphology operator="dilate" radius="1.5" in="SourceAlpha" result="expanded"/>
					<feFlood floodColor="#80d8ff" result="highlightColor"/>
					<feComposite in="highlightColor" in2="expanded" operator="in" result="expandedColored" />
					<feGaussianBlur stdDeviation="2" in="expandedColored" result="highlight"/>
				 	<feComposite operator="over" in="SourceGraphic" in2="highlight"/>
				 </filter>
				<filter id="textBackground" primitiveUnits="userSpaceOnUse">
					<feMorphology operator="dilate" radius="20" in="SourceAlpha" result="expanded"/>
					<feFlood floodColor="white" result="highlightColor"/>
					<feComposite in="highlightColor" in2="expanded" operator="in" result="expandedColored" />
					<feGaussianBlur stdDeviation="2" in="expandedColored" result="highlight"/>
				 	<feComposite operator="over" in="SourceGraphic" in2="highlight"/>
				 </filter>
			</defs>
			{children}
			<Expression pos={{x:20, y:20}}>
				<Value quantity="t"></Value>
				<Value quantity="x"></Value>
				<Value quantity="y"></Value>
			</Expression>
		</svg>)
	}
}
SmdApp.PropTypes = {
	actions: PropTypes.object.isRequired
};

function mapStateToProps(state, props) {
	return {
		childData: getChildren(state, 'app')
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(QuantityActions, dispatch)
	};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SmdApp);
