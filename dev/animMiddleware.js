import { getActiveTweens, tween, audio } from "./anim"
import { getValue, getAnimatable, getMax, getPlaying } from './ducks/quantity/selectors'
import { getAnimTime, getAnimPlaying, getAnimLength} from './ducks/content/selectors'
import QuantityActions from './ducks/quantity/actions'
import ContentActions from './ducks/content/actions'

export const animMiddleware = store => next => action => {
	function animStep() {
		var t0 = action.payload.initTime
		var v0 = action.payload.initValue
		var t = Date.now()
		var value = (t-t0)/1000 + v0
		var name = action.payload.name
		var state = store.getState()
		var isPlaying = getPlaying(state, name)

		if (isPlaying) { //only update and continue if quantity is still playing
			store.dispatch(QuantityActions.setValue(name, value))
			store.dispatch(QuantityActions.animStep(name, t0, v0))
		}

	}
	function animStart(){
		var t = Date.now()
		var name = action.payload.name
		var state = store.getState()
		var initValue = getValue(state, name)
		store.dispatch(QuantityActions.animStep(name, t, initValue))
	}
	//for data collection
	if (action.type === "SET_VALUE" && action.payload.keepHistory === true){
		var state = store.getState()
		var time = getValue(state, 't')
		action.payload.previousPoint = {t:time, value:action.payload.value}
	}
	//for animation of
	if (action.type === "ANIM_CONTENT"){
		const initTime = Date.now()
		const state = store.getState()
		const {courseId, partId, contentBlockId} = action.payload
		const initAnimTime = getAnimTime(state, courseId, partId, contentBlockId)
		const stepAction = ContentActions.animContentStep(courseId, partId, contentBlockId, initTime, initAnimTime)
		requestAnimationFrame(()=>{store.dispatch(stepAction)})
	} else if (action.type === "ANIM_CONTENT_STEP") {
		const state = store.getState()
		const {courseId, partId, contentBlockId, initAnimTime, initTime} = action.payload
		const prevTime = getAnimTime(state, courseId, partId, contentBlockId )
		const t = Date.now()
		const newTime = ((t-initTime)/1000)+initAnimTime//time since last play
		const playing = getAnimPlaying(state, courseId, partId, contentBlockId)
		const length = getAnimLength(state, courseId, partId, contentBlockId)
		const activeTweens = getActiveTweens(prevTime, newTime)
		tween(store, activeTweens, newTime)
		if (playing){
			if (newTime > length){
				const setTimeAction = ContentActions.setAnimTime(courseId, partId, contentBlockId, length)
				store.dispatch(setTimeAction)
			} else {
				const stepAction = ContentActions.animContentStep(courseId, partId, contentBlockId, initTime, initAnimTime)
				const setTimeAction = ContentActions.setAnimTime(courseId, partId, contentBlockId, newTime)
				store.dispatch(setTimeAction)
				requestAnimationFrame(()=>{store.dispatch(stepAction)})
			}
		}
	}
	/*
	if (action.type === "SET_VALUE" && action.payload.name === 'animTime'){
		var state = store.getState()
		var prevTime = getValue(state, 'animTime')
		var t = action.payload.value
		var activeTweens = getActiveTweens(prevTime, t)
		tween(store, activeTweens, t)
		if (audio.paused){
			audio.currentTime = t
		}
	} */else if (action.type === 'ANIM_PLAY') {
		/*if (action.payload.name === 'animTime'){
			audio.play()
		}*/
		requestAnimationFrame(animStart);
	} else if (action.type === 'ANIM_STEP') {
		requestAnimationFrame(animStep)
		function animStep() {
			var t0 = action.payload.initTime
			var v0 = action.payload.initValue
			var t = Date.now()
			var value = (t-t0)/1000 + v0
			var name = action.payload.name
			var state = store.getState()
            var max = getMax(state, name)
            var isPlaying = getPlaying(state, name)

			if (isPlaying) { //only update and continue if quantity is still playing
               if (value > max){
                    store.dispatch(QuantityActions.setValue(name, max))
                } else {
                    store.dispatch(QuantityActions.setValue(name, value))
                    store.dispatch(QuantityActions.animStep(name, t0, v0))
                }
			}

		}
	}
	next(action)
};
