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
import Tracker from './Tracker'
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
		if (this.props.match.url !== url) { //only update on change
			this.loadSim(url)
		}
	}
	loadSim(url){

		this.props.fetchSimData(url)
	}
	render(){
		const pos = this.props.pos || { x: 100, y: 100 }
		const active = this.props.active || true
		const image = (<div>inactive</div>)
		const childTypes = {
			"Plot": Plot,
            "Expression": Expression,
			"Tracker": Tracker
		}
		const simCardStyle = {
			...cardStyle, 
			width:this.props.width,
			height:this.props.height, 
			position: "relative",
			left: pos.x, 
			backgroundColor: '#fff' 
		}
		//combine these into one file for importing children
		function createChild(childData){
			var type = childTypes[childData.type]
			var props = childData.props
			props.key = props.id
			return React.createElement(type, props)
		}
		const children = this.props.childData.map(createChild)
		if (this.props.loadState === 'error') {
			return (
				<div style={{ ...cardStyle, left: pos.x, backgroundColor: '#fff', width: this.props.width, height: this.props.height }}>
					Error: Failed to Load Simulation
				</div>
			)
		}
		const loadingIcon = (<div style={{ position: 'absolute' }}>Loading</div>)

		const content = active ? children : image
		return (
			<div style={simCardStyle}>
				{this.props.loadState === "loading" ? loadingIcon : null }
				{content}
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
