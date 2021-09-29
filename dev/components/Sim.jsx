import React, { PropTypes } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from 'redux';
import SimActions from '../ducks/sim/actions'
import { getLoadState } from '../ducks/sim/selectors'
import { getValue } from '../ducks/quantity/selectors'
import { getChildren } from '../ducks/widget/selectors'
import Video from './Video'
import Plot from './Plot'
import PolarPlot from './PolarPlot'
import Expression from './Expression'
import Equation from './Equation'
import Tracker from './Tracker'
import Text from './Text'
import Line from './Line'
import { cardStyle } from './styles'
import Link from 'redux-first-router-link'



class Sim extends React.Component {
	constructor(props){
		super(props)
		this.loadSim = this.loadSim.bind(this)
		this.closeSim = this.closeSim.bind(this)
	}

	componentDidMount(){
		const contentBlockId = this.props.contentBlockId
		this.loadSim(contentBlockId)
	}
	componentWillReceiveProps(nextProps){
		//componentWill update takes next props as argument

		const contentBlockId = nextProps.contentBlockId
		if (this.props.contentBlockId !== contentBlockId) { //only update on change
			this.loadSim(contentBlockId)
		}
	}
	loadSim(contentBlockId){
		if (contentBlockId === null){

		} else {
			const url = `/courses/${this.props.courseId}/${this.props.partId}/${contentBlockId}`
			this.props.fetchSimData(url)
		}

	}
	closeSim(){

	}
	render(){
		const { contentBlockId, partId, courseId } = this.props
		const active = this.props.contentBlockId !== null
		const imageUrl = `/content/courses/${this.props.courseId}/${this.props.partId}/thumbnail.png`
		const image = (
			<Link to={`/courses/${this.props.courseId}/${this.props.partId}/${this.props.contentBlockId}`}>
				<img
					style={{
						maxWidth: '100%',
						maxHeight: '100%',
						margin: '0 auto',
						draggable: 'false' }} src={imageUrl}></img>
			</Link>
		)
		const childTypes = {
			"Plot": Plot,
			"PolarPlot": PolarPlot,
            "Expression": Expression,
            "Equation": Equation,
            "Text": Text,
            "Line": Line,
			"Tracker": Tracker,
			"Video": Video
		}
		const simCardStyle = {
			...cardStyle, 
			width: 1200,
			height: 800,
			position: "relative",
			overflow: 'hidden',
			left: 0,
			top: 0,
			float: 'left',
			backgroundColor: '#fff' 
		}
		//combine these into one file for importing children
		function createChild(childData){
			var type = childTypes[childData.type]
			var props = {...childData.props, contentBlockId, partId, courseId}
			props.key = props.id
			return React.createElement(type, props)
		}
		const children = this.props.childData.map(createChild)

		const loadingIcon = (<div>Loading</div>)
		const content =  children

		return (
			<div style={simCardStyle}>

				{/*this.props.loadState === "loading" ? loadingIcon : null*/ }
				{this.props.loadState === 'error' ? 'Error: Failed to Load Simulation' : null}
				{content}
			</div>
		)
	}
}


function mapStateToProps(state, props) {
    const children = getChildren(state, 'app')
	return {
		childData: children,
		loadState: getLoadState(state)
	}
}

function mapDispatchToProps(dispatch) {
	return {
		fetchSimData: (path) => {
			dispatch(SimActions.fetchSimData(path))
		}
	}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sim)
