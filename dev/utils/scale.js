"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
var Scale = function Scale(params) {
	var params = params || {};
	var scale = this;
	this.min = params.min || 0;
	this.max = params.max || 10;
	this.tMin = params.tMin || 0;
	this.tMax = params.tMax || 100;

	this.transform = function (value) {
		var range = scale.max - scale.min;
		var tRange = scale.tMax - scale.tMin;
		return (value - scale.min) / range * tRange + scale.tMin;
	};

	this.invert = function (tValue) {
		var range = scale.max - scale.min;
		var tRange = scale.tMax - scale.tMin;
		return (tValue - scale.tMin) / tRange * range + scale.min;
	};
};

exports.Scale = Scale;

var CoordSys = function CoordSys(xScale, yScale) {
	this.xScale = xScale
	this.yScale = yScale
	this.transform = function (point) {
		return {
			x: xScale.transform(point.x),
			y: yScale.transform(point.y)
		}
	}
	this.invert = function (point) {
		return {
			x: xScale.invert(point.x),
			y: yScale.invert(point.y)
		}
	};
};
exports.CoordSys = CoordSys;
