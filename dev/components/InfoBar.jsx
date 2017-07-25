import React from "react";
import { connect } from "react-redux"
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom'
import { linkStyle } from './styles'
import { Route, Switch, Redirect } from 'react-router'
import ContentActions from '../ducks/content/actions'
import { getContentBlocks } from '../ducks/content/selectors'
import {getValue, getTransformedValue, getCoordSys, getQuantityData} from '../ducks/quantity/selectors'
import ContentBlock from "./ContentBlock"
import {cardStyle} from './styles'

class InfoBar extends React.Component {
	componentDidMount(){
		const path = ['courses', 'controlsystems', 'dho']
		//this.props.fetchPartData(path)
	}
	render() {
		var headerStyle = {

			fontSize:20,
			color : '#eee',
			textAlign: 'center',

			padding:20
		}
		const createContentBlocks = (contentData) => (

			<Link
				key={contentData.id}
				style={linkStyle}
				to={`${this.props.url}/${contentData.id}`}
				>
				<Switch>
					<Route
					exact path={`${this.props.url}/${contentData.id}`}
					render={()=>(
						<ContentBlock
						active={true}
						{...contentData}
						/>
					)}
					/>
					<Route
						path={`${this.props.url}`}
						render={()=>(
							<ContentBlock
							active={false}
							{...contentData}
							/>
						)}
					/>
				</Switch>



			</Link>
		)
		const contentBlocks = this.props.contentBlocks.map(createContentBlocks)

		return (
			<div style={{
					overflow: "hidden",
					width: this.props.width,
					fontFamily: '"Roboto", sans-serif',
					fontWeight: "500",
					fontSize: 15,
					margin: 5,
					position: 'absolute',
				}}>
                <div style={headerStyle}>
					<div >Part 01: Simple Harmonic Oscillator</div>
				</div>
				<div style={{ fontSize: 13, padding:0}}>
					{contentBlocks}
				</div>
            </div>
		)
	}
}



function mapStateToProps(state, props) {
	return {
		contentBlocks: getContentBlocks(state, props.partId)
	}
}

function mapDispatchToProps(dispatch) {
	return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InfoBar)
