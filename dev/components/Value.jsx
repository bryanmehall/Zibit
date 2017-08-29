import React from "react"
import ReactDOM from "react-dom"
import { connect } from "react-redux"
import QuantityActions from '../ducks/quantity/actions'
import WidgetActions from '../ducks/widget/actions'
import { UpArrow, DownArrow, Anim } from './icons'
import { getActive } from '../ducks/widget/selectors'
import { getValue, getQuantityData, getHighlighted, getIndependent, getAnimatable, getPlaying, getColor } from '../ducks/quantity/selectors'
import { mathVarStyle, mathTextStyle, displayValue } from './styles'
import ValueOverlay from './ValueOverlay'


class Value extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			bbox:{x:0, y:0, width:10, height:0}
		}
	}
    componentDidUpdate(){

		const bbox = ReactDOM.findDOMNode(this).getBoundingClientRect()
		//this.setState({bbox:bbox})
		//const prevWidth = this.width || bbox.width
		//this.width = bbox.width
		//const dw = this.width-prevWidth
		//this.props.updateWidth(dw)
    }

	render(){
		var self = this
        var quantity = this.props.quantity
		var bbox = this.props.bbox || {width:0}
        var independent = this.props.independent
		const active = this.props.active
        const highlighted = this.props.highlighted
        const value = this.props.quantityValue
		var filter = highlighted ? "url(#highlight)" : null//seei f this works with css filters
        var mouseOver = () => {
			this.wasHighlighted = this.props.highlighted
			this.props.setHighlight(quantity,true)
		}
        var mouseOut = () => {
			if (!this.wasHighlighted){
            	this.props.setHighlight(quantity, false)
			}
		}
		const mouseDown = () => {
			this.props.setActive(this.props.id, true)
		}
		const style = highlighted ? mathTextStyle : mathVarStyle
		/*const independentControls = (

			<DownArrow pos={{ x: bbox.width/2, y: 0 }} active={false}></DownArrow>
			this.props.highlighted ? hoverAnimButton : null
		)*/
		//parse symbol from string
		let symbol
		const underscoreIndex = this.props.symbol.indexOf("_")
		if (underscoreIndex === -1){
			symbol = this.props.symbol
		} else {
			const text = this.props.symbol.substring(0, underscoreIndex)
			const sub = this.props.symbol.substring(underscoreIndex+1)
			symbol = <span>{text}<sub style={{fontStyle:'normal', fontSize:"62%"} }>{sub}</sub></span>
		}
		const overlay = (
			<div>
			<div
				style={{
					width: "105%",
					left: "-5%",
					top: -50,
					position: 'absolute',
					height: 150,
					border: "1px solid #ccc",
					backgroundColor: 'white',
					borderRadius: 5
			}}></div>
				<Anim state={"playing"}></Anim>
				</div>
                )
        //const precision = this.props.precision || Math.min(3,Math.max(Math.log10(Math.abs(value)+2),1))
        //if (quantity = 't') {console.log('t',Math.log10(Math.abs(value)+2))}
        //because the default toPrecision function is just bad
        //converts scientific notation while keeping trailing zeroes
		//<tspan dx={3}>F<tspan fontSize="0.5em" baselineShift="sub">s</tspan></tspan>
		return (
                <div
                    style={{
						...style,
						justifyContent: 'center',
						position:'relative',
						//repeat shadows to make thicker because css is one giant hack
						textShadow: highlighted ? `-1px -1px 4px ${this.props.color},  1px 1px 4px ${this.props.color}` : null
					}}
					onMouseOver={mouseOver}
					onMouseOut={mouseOut}
					onMouseDown={mouseDown}
                >

					<div style={{ position: "absolute", width: "100%" }}>
						{independent ?  <UpArrow active={false}></UpArrow>: null}
					</div>
					{highlighted ? displayValue(value) : symbol}
					<div style={{ position: "absolute", width: "100%" }}>
						{independent ?  <DownArrow active={false}></DownArrow>: null}
						{active ? overlay : null}
					</div>

			</div>
		)
    }
}

function mapStateToProps(state, props) {

	var quantityData = getQuantityData(state, props.quantity)
	return {
		symbol: quantityData.symbol,
		independent: getIndependent(state, props.quantity),
		active: props.active !== undefined ? props.active : getActive(state, props.id),
		highlighted: getHighlighted(state, props.quantity),
		quantityValue: getValue(state, props.quantity),
		color: getColor(state, props.quantity),
		playing: getPlaying(state, props.quantity)
        //add precision as state
	};
}

function mapDispatchToProps(dispatch) {
	return {
		setHighlight:(name, value) => {
			dispatch(QuantityActions.setHighlight(name, value))
		},
		setActive:(name, value) => {
			dispatch(WidgetActions.setActive(name, value))
		},
		setPlay:(name, value) => {
			dispatch(QuantityActions.setPlay(name, value))
		}
	};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Value);
