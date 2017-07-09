import React, {PropTypes} from "react"
import {connect} from "react-redux"
import { bindActionCreators } from 'redux';
import * as QuantityActions from '../ducks/quantity/actions';
import {getValue} from '../ducks/quantity/selectors'
import {getChildren} from '../ducks/widget/selectors'
import Slider from './Slider'
import TitleBar from './TitleBar'
import Plot from './Plot'
import Abstraction from './Abstraction'
import Expression from './Expression'
import Value from './Value'
import SideBar from './SideBar'
import NavBar from './NavBar'
import Sim from './Sim'
import NewExpression from './NewExpression'
import {cardStyle} from './styles'


class SmdApp extends React.Component {
	constructor(props) {
		super(props);
		this.state = { width: '0', height: '0' };
		this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
	}

	componentDidMount() {
	  	this.updateWindowDimensions();
	  	window.addEventListener('resize', this.updateWindowDimensions);
	}

	componentWillUnmount() {
	  	window.removeEventListener('resize', this.updateWindowDimensions);
	}

	updateWindowDimensions() {
	  	this.setState({ width: window.innerWidth, height: window.innerHeight });
	}

	render(){
		const { actions } = this.props;
		const sideBarWidth = 0.25*this.state.width
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
		const navPath = []
		//console.log('sim match', this.props.match)
		return (
			<div>
				<div style={{display:'relative'}}>
					<NavBar path={navPath}></NavBar>
                    <TitleBar width={sideBarWidth - cardStyle.margin} height={85}></TitleBar>
					<SideBar width={sideBarWidth - cardStyle.margin} height={400}></SideBar>
					<Sim width={700} height={600} pos={{x:sideBarWidth+cardStyle.margin, y:100}}/>
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
