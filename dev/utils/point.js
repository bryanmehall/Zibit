export const getTransformString = (point) => ('translate('+point.x+','+point.y+')')

export const dist = (p1, p2) => {
	const dx = p2.x-p1.x
	const dy = p2.y-p1.y
	return Math.sqrt(dx*dx+dy*dy)
}

export const angle = (p1, p2) => {
	const dx = p2.x-p1.x
	const dy = p2.y-p1.y
	return Math.atan2(dy, dx)
}

export const rotate = (p, a) => ({
	x: Math.cos(a) * p.x - Math.sin(a) * p.y,
	y: Math.sin(a) * p.x + Math.cos(a) * p.y
})

export const getClosestPointOnLine = (p, l1, l2) => {
    const A = p.x - l1.x
	const B = p.y - l1.y
	const C = l2.x - l1.x
	const D = l2.y - l1.y

	const dot = A * C + B * D
	const lenSq = C * C + D * D
	let param = -1
	if (lenSq != 0){ //in case of 0 length line
		param = dot / lenSq
	}
	let xx, yy

	if (param < 0) {
		xx = l1.x
		yy = l1.y
	}
	else if (param > 1) {
		xx = l2.x
		yy = l2.y
	}
	else {
		xx = l1.x + param * C
		yy = l1.y + param * D
	}
    return { x: xx, y: yy }
}

export const getDistToLine = (p, l1, l2) => {
	//normalize points so l1 is at origin
	const closestPoint = getClosestPointOnLine(p,l1,l2)
	const dx = p.x - closestPoint.x
	const dy = p.y - closestPoint.y
	return Math.sqrt(dx * dx + dy * dy)
}

export const svgToScreen = (svgId, svgNode, point) => {
    const svg = document.getElementById(svgId)
    const pt = svg.createSVGPoint();
    pt.x = point.x
    pt.y = point.y
    const transformedPoint = pt.matrixTransform(svgNode.getScreenCTM().inverse());
    return transformedPoint
}
