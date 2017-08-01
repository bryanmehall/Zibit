import React, {PropTypes} from "react"
import {connect} from "react-redux"
import { bindActionCreators } from 'redux';
import SimActions from '../ducks/sim/actions'
import { getLoadState } from '../ducks/sim/selectors'
import {getValue} from '../ducks/quantity/selectors'
import {getChildren} from '../ducks/widget/selectors'
import Slider from './Slider'
import TitleBar from './TitleBar'
import Plot from './Plot'
import Abstraction from './Abstraction'
import Expression from './Expression'
import Value from './Value'
import { cardStyle } from './styles'


class Sim extends React.Component {
	constructor(props){
		super(props)
		this.loadSim = this.loadSim.bind(this)
	}

	componentDidMount(){
		const url = this.props.match.url
		this.loadSim(url)
	}
	componentWillReceiveProps(nextProps){
		//componentWill update takes next props as argument

		const url = nextProps.match.url
		if (this.props.match.url !== url) {//only update on change
			this.loadSim(url)
		}
	}
	loadSim(url){

		this.props.fetchSimData(url)
	}
	render(){

		const pos = this.props.pos || { x: 100, y: 100 }
		var childTypes = {
			"Plot": Plot,
            "Expression": Expression
		}

		function createChild(childData){
			var type = childTypes[childData.type]
			var props = childData.props
			props.key = props.id
			return React.createElement(type, props)
		}
		const children = this.props.childData.map(createChild)
		if (this.props.loadState === 'error'){
			return <div style={{ ...cardStyle, left: pos.x, backgroundColor: '#fff', width: this.props.width, height: this.props.height }}>
				Error: Failed to Load Simulation
			</div>
		}
		const loadingIcon = <div style={{ position: 'absolute' }}>Loading</div>
		return (
			<div style={{ ...cardStyle, left: pos.x, backgroundColor: '#fff' }}>
				{this.props.loadState === "loading" ? loadingIcon : null }
				<svg
					width={this.props.width}
					height={this.props.height}
					id="sim"
					>
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
					<filter id="dropShadow">
						<feOffset result="offOut" in="SourceAlpha" dx="0.5" dy="1" />
						<feGaussianBlur result="blurOut" in="offOut" stdDeviation="1" />
						<feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
					</filter>
				</defs>
				{children}
				</svg>
			</div>
       	)
	}
}


function mapStateToProps(state, props) {
	return {
		childData: getChildren(state, 'app'),
		loadState: getLoadState(state)
	};
}

function mapDispatchToProps(dispatch) {
	return {
		fetchSimData: (path) => {
			dispatch(SimActions.fetchSimData(path))
		}

	};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sim);
