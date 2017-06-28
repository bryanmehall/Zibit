import React from "react"
import ReactDOM from "react-dom"
import Slider from './Slider'
import {connect} from "react-redux"
import { bindActionCreators } from 'redux'
import QuantityActions from '../ducks/quantity/actions'
import WidgetActions from '../ducks/widget/actions'
import {getValue, getQuantityData, getMin, getMax, getAnimatable, getPlaying} from '../ducks/quantity/selectors'
import Animation from './Animation'
import { UpArrow, DownArrow } from './icons'
import { svgToScreen } from '../utils/point'
import { transform } from '../utils/scale'
import { displayValue, mathTextStyle } from './styles'


class ValueOverlay extends React.Component {
	constructor(props){
		super(props)
		this.state = {activityLevel:0}
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
		const activityLevel = 0.0 //0 displays as inactive 1 as active
        const inactiveY1 = 0
        const inactiveY2 = bbox.height
        const activeY1 = -50
        const activeY2 = 50
        console.log(transform(0, 1, inactiveY1, activeY1, activityLevel))
        const sliderP1 = {
            x: bbox.width/2,
            y: transform(0, 1, inactiveY2, activeY2, activityLevel)
        }
        const sliderP2 = {
            x: bbox.width/2,
            y: transform(0, 1, inactiveY1, activeY1, activityLevel)
        }
        const origin = {x:bbox.x+bbox.width/2, y:bbox.y+bbox.height}
		const value = this.props.quantityValue
        const mouseOver = (e) => {
            this.props.setHighlight(quantity, true)
        }
        const mouseOut = (e) => {
            //this.props.setHighlight(quantity, false)
        }
        const mouseMove = (e) => {
            const domNode = ReactDOM.findDOMNode(this)
            const screenPoint = {
                x: e.clientX,
                y: e.clientY
            }
            const mousePos = svgToScreen('sim', domNode, screenPoint)
            const dt = ((new Date())-this.dragStartTime)/1000
            this.dragStartPoint = mousePos
            console.log(dt,mousePos)
        }
        const mouseDown = () => {
			this.setState({
				prevValue:value,

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

            //
            document.addEventListener('mousemove', mouseMove, false)
        }
		/*const activeOverlay = (
			<g>
				<Animation
					pos={{ x: -100, y: 12 }}
					quantity = {quantity}
					playing={this.props.playing}
				></Animation>

			</g>
		)*/
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
							filter="url(#dropShadow)"
                            fill={"rgb(255, 192, 192)"}
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
            </g>
        )
        const inactiveOverlay = (
            <g>
                <rect
                    x={0}
                    y={-bbox.height}
                    height={bbox.height}
                    width={bbox.width}
                    fill={ active ? "#fff": "rgba(0, 0, 0, 0.1)"}
                    onMouseEnter={mouseOver}
                    onMouseLeave={mouseOut}
                    onMouseDown={mouseDown}
                    ></rect>
                <g>
					<UpArrow pos={{ x: bbox.width/2, y: -bbox.height }} active={false}></UpArrow>
					<DownArrow pos={{ x: bbox.width/2, y: 0 }} active={false}></DownArrow>
                </g>
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
		independent: quantityData.independent,
		highlighted: quantityData.highlighted,
		quantityValue: getValue(state, props.quantity),
        quantityMin: getMin(state, props.quantity),
        quantityMax: getMax(state, props.quantity),
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
