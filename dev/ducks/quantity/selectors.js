import { createSelector } from 'reselect'
import { linspace, dopri } from 'numeric'
import * as math from 'mathjs'

//define dependent variables --should be pure functions

function dl(x, y) {
	return y - x
}

function fs(dl, k) {
	return -dl * k
}

function fext(forces){
	return -1*forces.reduce((sum, force) => (sum+force))
}

function s(t) {
	return 0*t
}

function y(sol, t) {
	return sol.at(t)[0]
}
function theta(sol, t){
	return sol.at(t)[0]
}
function thetaF(anchorX, anchorY, x, y) {
	const dx = x-anchorX
	const dy = y-anchorY
	Math.atan2(dx, dy)//atan2 flips x and y but it is flipped back because pendulum is vertical
}

//define scales
function transform(value, scale) {
	var range = scale.max - scale.min;
	var tRange = scale.tMax - scale.tMin;
	return (value - scale.min) / range * tRange + scale.tMin;
}


//define value accessors
export const getQuantityData = function (state, name) { //make this not avaliable
		if (name === undefined) {
			throw new Error('Selector Error: name is undefined')
		} else if (name === 'zero') { //should this abstraction go here?
			return {value:0, min:0, max:1, independent:true}
		} else {
			const quantityData = state.sim.quantity[name]
			if (quantityData === undefined) {
				console.log(state, name)
				throw new Error(`can not find quantity named ${name}`)
			}
			return quantityData
		}


}

export const getMath = (state, name) => { //get math.js object of a quantity
    const independent = getIndependent(state, name)
    const quantityData = getQuantityData(state, name)
    return independent ? math.parse(quantityData.value) : math.parse(quantityData.equation)
}

const fMap = new Map()
const getFunction = (state, name, indVars) => {
    const node = getMath(state, name)
    const symbols = node
        .filter((node) => (
            node.isSymbolNode
        ))
        .map((symbolNode) => (symbolNode.name))
    const uniqueSymbols = new Set(symbols)
    indVars.forEach((indVar) => { uniqueSymbols.delete(indVar) })
    const globals = [...uniqueSymbols]
    const varDefs = globals.map((varName) => (`${varName} = ${getValue(state, varName)}`))
    const functionString = `${varDefs.join('\n')}\nreturn ${node.toString()}`
    if (fMap.has(functionString)){
        return fMap.get(functionString)
    } else {
        const func = new Function(indVars, functionString)
        fMap.set(functionString, func)
        return func
    }

}



const getStyledSymbol = (state, name) => {
    const color = getColor(state, name)
    const highlighted = getHighlighted(state, name)
    const symbol = getSymbol(state, name)
    const coloredTex = `\\textcolor{${color}}{${symbol}}`
    return highlighted ? `\\underline{${coloredTex}}` : coloredTex
}

export const getTex = (state, name) => {
    const customLaTeX = (node, options) => {
        if (node.type === 'SymbolNode') {
            //don't forget to pass the options to the toTex functions
            return ' ' + getStyledSymbol(state, node.name)
        } else if (node.type === 'FunctionNode'){
            return ' ' + getStyledSymbol(state, node.fn.name)
        } else if (node.type === 'AssignmentNode'){
            const expanded = getExpanded(state, node.name)
            if (expanded) {
                const highlighted = getHighlighted(state, node.name)
                const expandedTex = node.value.toTex(options)
                const symbol = getStyledSymbol(state, node.name)
                return highlighted ? `\\overbrace{${expandedTex}}^{${symbol}}` : expandedTex
            } else {
                return getStyledSymbol(state, node.name)
            }
        }
    }
    return getMath(state, name).toTex({ handler: customLaTeX, implicit: 'hide', parenthesis: 'auto' }
    )
}


export const getMin = (state, name) => (getQuantityData(state, name).min)

export const getMax = (state, name) => (getQuantityData(state, name).max)

export const getSymbol = (state, name) => (getQuantityData(state, name).symbol)

export const getIndependent = (state, name) => (getQuantityData(state, name).independent || false)

export const getExpanded = (state, name) => (getQuantityData(state, name).expanded || true)

export const getAnimatable = (state, name) => (getQuantityData(state, name).hasOwnProperty('animation'))

export const getColor = (state, name) => (getQuantityData(state, name).color || '#000000')

export const getHighlighted = (state, name) => (getQuantityData(state, name).highlighted || false)

export const getPlaying = (state, name) => {
	var animatable = getAnimatable(state, name)

	if (animatable) {
		return getQuantityData(state, name).animation.playing
	} else {
		return false
	}
}
export const getScale = (state, quantity, min, max) => ({
	min: getMin(state, quantity),
	max: getMax(state, quantity),
	tMin: min,
	tMax: max
})

export const getCoordSys = (state, xVar, yVar, parentBB) => ({
	xScale: {
		min: getMin(state, xVar),
		max: getMax(state, xVar),
		tMin: parentBB.xMin,
		tMax: parentBB.xMax
	},
	yScale: {
		min: getMin(state, yVar),
		max: getMax(state, yVar),
		tMin: parentBB.yMin,
		tMax: parentBB.yMax
	}

})

export const getValue = function (state, name, given={}) {
	//given is an object of independent variables that replace concrete values

	if (name === undefined){return 0}
	const quantityData = getQuantityData(state, name)

	if (quantityData.independent) {
		return (given[name] === undefined) ? quantityData.value : given[name]
	}
    if (quantityData.hasOwnProperty('equation')){
        const indVars = Object.keys(given)
        const func = getFunction(state, name, indVars)
        if (indVars.length !== 0){ throw 'given' }
        return func(getValue(state, 't'))

    }
	switch (name) {
		case "x": {
			const t = (given.t === undefined) ? getValue(state, 't') : given.t
			return 0//0x(t)
		}

		case 's': {
			const t = (given.t === undefined) ? getValue(state, 't') : given.t
			return s(t)
		}
        case "stateVector": {
            const y0 = getValue(state, 'y0')
            const dy0 = getValue(state, 'dy0')
            const min = getMin(state, 't')
            const max = getMax(state, 't')
            const dyVec = getFunction(state, 'dyVec', ['t', 'y'])
            const init = [y0, dy0]
			const sol = getSolNoMem(dyVec, init, min, max)
            return sol
        }
		case "y": {
			const t = (given.t === undefined) ? getValue(state, 't') : given.t
            const stateVector = getValue(state, 'stateVector')
			return stateVector.at(t)[0]
		}

		case "dydt": {
			const t = (given.t === undefined) ? getValue(state, 't') : given.t
            const stateVector = getValue(state, 'stateVector')
			return stateVector.at(t)[1]
		}
		case "dl": {
			var xVal = getValue(state, 'x')
			var yVal = getValue(state, 'y')
			return dl(xVal, yVal)
		}

		case "fs": {
			var dlVal = getValue(state, 'dl')
			var k = getValue(state, 'k')
			return fs(dlVal, k)
		}

		case "fext": {
			var fsVal = getValue(state, 'fs')
			var fdVal = 0//getValue(state, 'fd')
			return fext([fsVal,fdVal])
		}
		case "bobX": {
			let theta = getValue(state, "theta")
			let length = getValue(state, 'length')

			return Math.sin(theta)*length
		}
		case "bobY": {
			let theta = getValue(state, "theta")
			let length = getValue(state, 'length')
			return -Math.cos(theta)*length
		}
		case "theta": {
			const t = (given.t === undefined) ? getValue(state, 't') : given.t
			const sol = getPendulumSol(state)
			const thetaVal = theta(sol, t)
			return thetaVal
		}
		case "omega": {
			const t = (given.t === undefined) ? getValue(state, 't') : given.t
			const sol = getPendulumSol(state)
			return sol.at(t)[1]
		}
		case "fg_y": {
			const m = getValue(state, 'm')
			const g = getValue(state, 'g')
			return m*g
		}
		case "ft_x":
		case "ft_y": {
			const fg = getValue(state, "fg_y")
			const theta = getValue(state, "theta")
			const omega = getValue(state, "omega")
			const m = getValue(state, "m")
			const l = getValue(state, "length")
			const f_c = m*omega*omega*l
			if (name === "ft_x"){
				return Math.sin(theta)*(-f_c+fg)
			} else {
				return Math.cos(theta)*(f_c-fg)
			}
		}
		case "fnet_x":{
			return getValue(state, "ft_x")
		}
		case "fnet_y":{
			const fg = getValue(state, "fg_y")
			const ft_y = getValue(state, "ft_y")
			return fg+ft_y
		}

		case "measuredBobX":
		case "measuredBobY":
		case "measuredTheta":{
			const t = (given.t === undefined) ? getValue(state, 't') : given.t
			const l = getValue(state, 'length')
			const measuredX = getValue(state, 'measuredX')
			const measuredY = getValue(state, 'measuredY')
			const aX = 500/2
			const aY = 500/6 //find better way to calculate coordinate systems
			const angle = Math.atan2(measuredY-aY, measuredX-aX)
			if (name === "measuredBobX"){
				return Math.cos(angle)*l
			} else if (name === "measuredTheta"){
				return angle*180/Math.PI
			} else {
				return -Math.sin(angle)*l
			}
		}
		default:
			throw "make sure that " + name + " is labeled as independent"
	}
}

export const getTransformedValue = function (state, name, scale, given) {
	var value = getValue(state, name, given)
	var transformedValue = transform(value, scale)
	return transformedValue
}

//define factory functions for reselect memoization
function getValueff(name) {
	return (state) => getValue(state, name)
}

function getMinff(name) {
	return (state) => getMin(state, name)
}

function getMaxff(name) {
	return (state) => getMax(state, name)
}
const solMap = new Map()
function getSolNoMem(f, init, min, max) {
    const memoKey = JSON.stringify({ f:f.toString(), init, min, max })
    //console.log(solMap)
    if (solMap.has(memoKey)){
        return solMap.get(memoKey)
    } else {
        const sol = dopri(min, max, init, f, 1e-6, 2000)
        solMap.set(memoKey, sol)
        return sol
    }

}

const getPendulumSol = createSelector(
	[
		getValueff('theta0'),
		//getValueff('m'),
		//getValueff('c'),
		getValueff('length'),
		getValueff('g'),
		//getValueff('dy0'),
		getMinff('t'),
		getMaxff('t')
	],
	getPendSolNoMem
)
function getPendSolNoMem(theta0, l, g, min, max){
	var f = function(t, theta){
		return [
			theta[1],
			g / l * Math.sin(theta[0])//-c/(l*m)*theta[1] for damping
		];
	}
	var sol = dopri(min, max, [theta0, 0], f, 1e-6, 2000);
	return sol
}

export const getAbsValues = function (state, name, absName) { //slowdown is here
	//abstract name w.r.t. absName

	var absData = getQuantityData(state, absName)
	var absPoints = linspace(absData.min, absData.max, absData.abstractions)
	var values = absPoints.map(function (val) {
		return getValue(state, name, {
			[absName]: val
		})
	})
	return values
}

export const getAbsPoints = function (state, indVar, xVar, yVar) {
	if (yVar === "measuredTheta"){//total hack --needs to be cleaned up-- cubic splines?
		const xPrev = getQuantityData(state, "measuredX").previousValues
		const yPrev = getQuantityData(state, "measuredY").previousValues
		const aX = 500/2
		const aY = 500/6
		if (yPrev.length === 0){
			return [{x:0, y:0}]
		} else {
			return yPrev.map((yPoint, i) => {
				//iterate over y becasue the most recent y value
				//is not updated when the action is dispatched
				const t = yPoint.t
				const x = xPrev[i].value
				const y = yPoint.value
				const theta = Math.atan2( x-aX, y-aY)*180/Math.PI
				return {x:t, y:theta}
			})
		}


	}
	var xPoints = getAbsValues(state, xVar, indVar)
	var yPoints = getAbsValues(state, yVar, indVar)

	var points = xPoints.map(function (xVal, i) {
		return {
			x: xVal,
			y: yPoints[i]
		}
	})
	return points
}

export const getSecondaryAbsPoints = function (state, name, absName) {
	return { state, name, absName }
}
