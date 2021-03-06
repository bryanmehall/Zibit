import { LOCAL_SEARCH, GLOBAL_SEARCH, INVERSE, STATE_ARG, UNDEFINED, INPUT, INTERMEDIATE_REP } from './constants'
import { getAttr } from './objectUtils'

const fromEntries = (array) => (
    array.reduce((obj, entry) => ({ ...obj, [entry[0]]: entry[1] }), {})
)
export const mapObject = (object, mapFunction) => (
    fromEntries(Object.entries(object).map(mapFunction))
)
export const filterObject = (object, filterFunction) => (
    fromEntries(Object.entries(object).filter(filterFunction))
)
export const formatGetLog = (query, getStack) => (
    query+'.'+getStack.map((get) => (getAttr(get, 'attribute'))).join('.')
)
export const formatInverseArg = (query, getStack) => (
    query+'.'+getStack.map((get) => (getAttr(get, 'attribute'))).join('.')
)

export const formatDBSearchLog = (dbSearches) => (
    dbSearches.map((dbSearch) => {
        const hash = dbSearch.ast.hash
        const args = dbSearch.ast.args
        const dbArgList = Object.keys(args)
            .filter((arg) => (arg.type === GLOBAL_SEARCH))
        if (dbArgList.length === 0){
            return ''
        }
        const dbArg = args[hash]
        return formatGetLog(dbArg.query, dbArg.getStack)
    }).join(', ')
)
export const formatArg = (arg) => {
    if (typeof arg === 'boolean') { //for prim
        return arg
    }

    switch (arg.type){
        case INVERSE:
            return formatInverseArg(arg.query, arg.getStack)
        case LOCAL_SEARCH:
            return formatGetLog(arg.query, arg.getStack)
        case GLOBAL_SEARCH:
            return arg.query
        case STATE_ARG:
            return 'state '+arg.hash
        case INPUT:
            return arg.name
        default:
            throw `type ${arg.type} not found`
    }
}

export const formatVarDef = (varDef) => (
    `${varDef.key} = `
)
export const objectFromEntries = (obj, entry) => ( //convert array of [[key1, value1], ...] to an object when used with reduce
    Object.assign(obj, { [entry[0]]: entry[1] })
)
export const debugReduce = (shift, message) => {
    /* eslint-disable no-console */
    try {
        if (shift === 1) {
            //console.group(name)

            console.log(message)
        } else if (shift === -1){
            console.log(message)
            //console.groupEnd()
        }
    } catch (e){
        throw e
    }
    /* eslint-enable no-console */
}
export const getFunctionDiff = (function1, function2) => {
    const str1 = function1.toString()
    const str2 = function2.toString()
    if (str1 !== str2){
        throw str1+str2
    }
}
export const logFunctionTableDiff = (ft1, ft2) => {
    Object.entries(ft1).forEach((entry) => {
        const f2 = ft2[entry[0]]
        const f1 = entry[1]
        getFunctionDiff(f1, f2)
    })
}
export const logFunctionTable = (functionTable) => {
    Object.entries(functionTable).forEach((entry) => {
        const key = entry[0]
        const func = entry[1].toString()
        return { key, func }
    })
}

export const isUndefined = (objectData) => {
    if (typeof objectData === 'undefined'){
        throw new Error("objectData is JS undefined")
    }
    const nameObject = getAttr(objectData, 'name')
    if (nameObject === undefined){
        return false
    } else {
        return getAttr(nameObject, INTERMEDIATE_REP).value === UNDEFINED
    }
}

export const deleteKeys = (object, keys) => { //careful, this is a shallow copy... does this matter if just deleting keys?
	let objCopy = Object.assign({}, object)
	keys.forEach((key) => {
		delete objCopy[key]
	})
	return objCopy
}

export const compileToJS = (args, string) => {
    try {
        return new Function(args, string)
    } catch (e) {
        if (e instanceof SyntaxError) {
            console.log(string)
            throw new Error('Lynx Error: invalid syntax in compiled code '+e.message)
        } else {
            throw e
        }
    }
}


let timer = 0//performance.now()|| 0
let counter = 0
export const limiter = (timeLimit, countLimit) => {
    //const dt = performance.now()||0-timer
    counter+=1
    if (counter>countLimit){
        throw `compilation exceeded ${countLimit} cycles`
    }/* else if (dt>timeLimit){
        throw `compilation timed out after ${timeLimit} ms`
    }*/
}
export const resetLimiter = () => {
    counter = 0
}
