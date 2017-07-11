import React from "react"
import ReactDOM from "react-dom"
import Slider from './Slider'
import { connect } from "react-redux"
import { bindActionCreators } from 'redux'
import QuantityActions from '../ducks/quantity/actions'
import WidgetActions from '../ducks/widget/actions'
import {getValue, getQuantityData, getMin, getMax, getAnimatable, getPlaying, getIndependent, getColor} from '../ducks/quantity/selectors'
import Animation from './Animation'
import { UpArrow, DownArrow } from './icons'
import { svgToScreen, getDistToLine } from '../utils/point'
import { transform } from '../utils/scale'
import { displayValue, mathTextStyle } from './styles'


class ValueOverlay extends React.Component {
	constructor(props){
		super(props)
		this.state = { activityLevel: 1 }
		this.numberStyle = {
			fontFamily:'MathJax_Main,"Times New Roman",Times,serif',
      		fontSize:"1.6em",
      		WebkitTouchCallout: "none",
      		WebkitUserSelect: "none",
      		MozUserSelect: "none"
		}
	}

	render(){
        //origin is in lower left corner of text
        const independent = this.props.independent
		const bbox = this.props.bbox
		const quantity = this.props.quantity
		const active = this.props.active
		const activityLevel = this.state.activityLevel //0 displays as inactive 1 as active

        const inactiveY1 = -bbox.height/2
        const inactiveY2 = -bbox.height/2
        const activeY1 = 50
        const activeY2 = -50

        const sliderP1 = {
            x: bbox.width/2,
            y: transform(0, 1, inactiveY1, activeY1, activityLevel)
        }
        const sliderP2 = {
            x: bbox.width/2,
            y: transform(0, 1, inactiveY2, activeY2, activityLevel)
        }
        const origin = {x:bbox.x+bbox.width/2, y:bbox.y+bbox.height}
		const value = this.props.quantityValue
        const mouseOver = (e) => {
			this.wasHighlighted = this.props.highlighted
            this.props.setHighlight(quantity, true)
        }
        const mouseOut = (e) => {
			if (!this.props.playing){
            	this.props.setHighlight(quantity, false)
			}
        }

        const mouseMove = (e) => {
            const domNode = ReactDOM.findDOMNode(this)
            const screenPoint = {
                x: e.clientX,
                y: e.clientY
            }
            const mousePos = svgToScreen('sim', domNode, screenPoint)//mouse position in overlay coordinates

            const dt = ((new Date())-this.dragStartTime)/1000
            this.dragStartPoint = mousePos
            const dist = getDistToLine(mousePos, sliderP1, sliderP2)
            if (dist > bbox.width/2){
                const newActivityLevel = 1-(dist-bbox.width/2)/25
                this.setState({activityLevel:newActivityLevel})
                if (newActivityLevel <= 0) {
                    this.props.setActive(this.props.id, false)
					document.removeEventListener('mousemove', mouseMove)
                    this.props.setHighlight(quantity, false)
					this.setState({
						activityLevel: 1
					})
                }
            }
        }
        const mouseDown = (e) => {
			this.setState({
				prevValue: value,
				activityLevel:1
			})
            this.props.setActive(this.props.id, true)
            //get local mouse coords
            const domNode = ReactDOM.findDOMNode(this)
            const screenPoint = {
                x: e.clientX,
                y: e.clientY
            }
            const mousePos = svgToScreen('sim', domNode, screenPoint)
            //get initial values
            this.dragStartTime = new Date()
            this.dragStartPoint = mousePos

            document.addEventListener('mousemove', mouseMove)
        }

        const activeOverlay = (
            <g>
                <Slider
                    p1={sliderP1}
					p2={sliderP2}
					quantity={quantity}
					showAxis={true}
                    width={bbox.width}
					lengthOffset={bbox.height/2}
                    >
                        <rect
                            x={-bbox.width/2}
                            y={-bbox.height/2}
                            height={bbox.height}
                            rx="5"
                            ry="5"
                            width={bbox.width}
                            fill={this.props.color}
                    ></rect>
					<text
						style={mathTextStyle}
						x={-bbox.width/2}
                        y={0}
						alignmentBaseline="middle"
						>
						{displayValue(value)}
					</text>
                </Slider>
                <Animation
					pos={{ x: 8, y: sliderP1.y+20 }}
					quantity = {quantity}
					playing={this.props.playing}
				></Animation>
            </g>
        )
		const hoverText = <text
						style={mathTextStyle}
						x={0}
                        y={-bbox.height/2+4}
						alignmentBaseline="middle"
						fill={this.props.color || "black"}
						>
						{displayValue(value)}
					</text>
		const hoverAnimButton = (
			<Animation
				pos={{ x: bbox.width/2-9, y: 20 }}
				quantity = {quantity}
				playing={this.props.playing}
			></Animation>
		)
		const independentControls = (
			<g>
				<UpArrow pos={{ x: bbox.width/2, y: -bbox.height }} active={false}></UpArrow>
				<DownArrow pos={{ x: bbox.width/2, y: 0 }} active={false}></DownArrow>
				{this.props.highlighted ? hoverAnimButton : null}
			</g>
		)
        const inactiveOverlay = (
            <g>
                {this.props.highlighted ? hoverText : null}
				<rect
                    x={0}
                    y={-bbox.height}
                    height={bbox.height+70}
                    width={bbox.width}
                    fill={ active ? "#fff": "rgba(0, 0, 0, 0.0)"}
                    onMouseEnter={mouseOver}
                    onMouseOut={mouseOut}
                    onMouseDown={independent ? mouseDown : null}
                    >
				</rect>
				{independent ? independentControls : null}

            </g>

		)
		return (
			<g transform={'translate('+bbox.x+','+(bbox.y+bbox.height)+')'}>
				{active ? null : inactiveOverlay}
				{active ? activeOverlay : null}
			</g>
			)

	}
}

function mapStateToProps(state, props) {
	var quantityData = getQuantityData(state, props.quantity)

	return {
		symbol: quantityData.symbol,
		independent: getIndependent(state, props.quantity),
		highlighted: quantityData.highlighted,
		quantityValue: getValue(state, props.quantity),
        quantityMin: getMin(state, props.quantity),
        quantityMax: getMax(state, props.quantity),
		//animatable:getAnimatable(state, props.quantity),
		playing: getPlaying(state, props.quantity),
		color:getColor(state, props.quantity)
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
