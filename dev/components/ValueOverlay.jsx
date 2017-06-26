import React from "react"
import ReactDOM from "react-dom"
import Slider from './Slider'
import {connect} from "react-redux"
import { bindActionCreators } from 'redux'
import QuantityActions from '../ducks/quantity/actions'
import WidgetActions from '../ducks/widget/actions'
import {getValue, getQuantityData, getAnimatable, getPlaying} from '../ducks/quantity/selectors'
import Animation from './Animation'
import {UpArrow, DownArrow} from './icons'

class ValueOverlay extends React.Component {
	constructor(props){
		super(props)
		this.state = {}
		this.numberStyle = {
			fontFamily:'MathJax_Main,"Times New Roman",Times,serif',
      		fontSize:"1.6em",
      		WebkitTouchCallout: "none",
      		WebkitUserSelect: "none",
      		MozUserSelect: "none"
		}
	}

	render(){
        const independent = this.props.independent
		const bbox = this.props.bbox
		const quantity = this.props.quantity
		const active = this.props.active
		const activityLevel = 0 //0 displays as inactive 1 as active
        const origin = {x:bbox.x+bbox.width/2, y:bbox.y+bbox.height}
        //const sliderp1 =
        const mouseMove = (e) => {

            console.log(e)
        }
        const mouseClick = () => {
            this.props.setActive(this.props.id, true)
            var svg = document.querySelector('#valueOverlay');
            console.log("overlay", svg)
            // Create an SVGPoint for future math
            var pt = svg.createSVGPoint();

            // Get point in global SVG space
            function cursorPoint(evt){
              pt.x = evt.clientX; pt.y = evt.clientY;
              return pt.matrixTransform(svg.getScreenCTM().inverse());
            }

            svg.addEventListener('mousemove',mouseMove,false);
        }
		const activeOverlay = (
			<g>
				<text
						x={bbox.width+6}
						y={-5}
						style={this.numberStyle}
						filter="url(#textBackground)">
						{'= '+(Math.round(this.props.quantityValue*100)/100)}
					</text>
				<rect x={-105} y={5} height={50} width={190} fill="#eee" id="valueOverlay"></rect>
				<Slider
					p1={{ x: -20, y: 0 }}
					p2={{ x: -20, y: 100 }}
					quantity={quantity}
					showAxis={true}
					onDragStart={this.onDragStart}
					onDragEnd={this.onDragEnd}
					/>
				<Animation
					pos={{ x: -100, y: 12 }}
					quantity = {quantity}
					playing={this.props.playing}
				></Animation>

			</g>
		)
        const inactiveOverlay = (
            <g>
                <rect x={0} y={-bbox.height} height={bbox.height} width={bbox.width} fill={"rgba(0, 0, 0, 0.0)"} onMouseDown={mouseClick}></rect>
                <g>
					<UpArrow pos={{ x: bbox.width/2, y: -bbox.height }} active={false}></UpArrow>
					<DownArrow pos={{ x: bbox.width/2, y: 0 }} active={false}></DownArrow>
                </g>
            </g>

		)
		return (
			<g transform={'translate('+bbox.x+','+(bbox.y+bbox.height)+')'}>
				{inactiveOverlay}
				{active ? activeOverlay : null}
			</g>
			)

	}
}

function mapStateToProps(state, props) {
	var quantityData = getQuantityData(state, props.quantity)
	return {
		symbol: quantityData.symbol,
		independent: quantityData.independent,
		highlighted: quantityData.highlighted,
		quantityValue: getValue(state, props.quantity),
		//animatable:getAnimatable(state, props.quantity),
		playing: getPlaying(state, props.quantity)
	};
}

function mapDispatchToProps(dispatch) {
	return {
		setHighlight: (name, value) => {
			dispatch(QuantityActions.setHighlight(name, value))
		},

		setActive: (name, value) => {
			dispatch(WidgetActions.setActive(name, value))
		},

		setPlay: (name, value) => {
			dispatch(QuantityActions.setPlay(name, value))
		}
	};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ValueOverlay);
