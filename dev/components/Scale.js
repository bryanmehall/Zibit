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

exports["default"] = Scale;
module.exports = exports["default"];