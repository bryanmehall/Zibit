import React, {PropTypes} from "react"
import {connect} from "react-redux"
import { bindActionCreators } from 'redux';
import * as QuantityActions from '../ducks/quantity/actions';
import {getValue} from '../ducks/quantity/selectors'
import {getChildren} from '../ducks/widget/selectors'
import Slider from './Slider'
import Plot from './Plot'
import Abstraction from './Abstraction'
import Expression from './Expression'
import Value from './Value'
import SideBar from './SideBar'
import NewExpression from './NewExpression'


class SmdApp extends React.Component {
	constructor(props){
		super(props)
	}
	render(){
		const { actions } = this.props;
		var childTypes = {
			"Plot": Plot,
            "NewExpression": NewExpression,
			"Expression": Expression
		}

		function createChild(childData){
			var type = childTypes[childData.type]
			var props = childData.props
			props.key = props.id
			return React.createElement(type, props)
		}
		var children = this.props.childData.map(createChild)
		var app = this
		var appStyle = {
			display: 'flex',
			fontFamily: "helvetica",
			fontSize: 15,
			margin: 10,
			mozBoxSizing: "border-box",
			boxSizing: "border-box",
			boxShadow: "0 4px 8px 0 rgba(1,1,1,0.8)"
		}

		return (
			<div>
				<div style={{ ...appStyle, backgroundColor: "#666",  padding:10, height:40, color:"#eee"}}>
					Zibit > Control Systems > Part 02: Damped Harmonic Oscillator > Question Here
				</div>
				<div style={{...appStyle}}>
					<SideBar></SideBar>
					<div style={{flexGrow: 1, marginLeft:10, height:"25%", backgroundColor:'white'}}>
						<svg width={700} height={600} id="sim" >
						<defs>
							<filter id="highlight" primitiveUnits="userSpaceOnUse">
								<feMorphology operator="dilate" radius="1.5" in="SourceAlpha" result="expanded"/>
								<feFlood floodColor="#80d8ff" result="highlightColor"/>
								<feComposite in="highlightColor" in2="expanded" operator="in" result="expandedColored" />
								<feGaussianBlur stdDeviation="2" in="expandedColored" result="highlight"/>
								<feComposite operator="over" in="SourceGraphic" in2="highlight"/>
							 </filter>
							<filter id="textBackground" primitiveUnits="userSpaceOnUse">
								<feMorphology operator="dilate" radius="100" in="SourceAlpha" result="expanded"/>
								<feFlood floodColor="white" result="highlightColor"/>
								<feComposite in="highlightColor" in2="expanded" operator="in" result="expandedColored" />
								<feGaussianBlur stdDeviation="1" in="expandedColored" result="highlight"/>
								<feComposite operator="over" in="SourceGraphic" in2="highlight"/>
							 </filter>
						</defs>
						{children}
						</svg>
					</div>
				</div>


			</div>
            )
	}
}


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
