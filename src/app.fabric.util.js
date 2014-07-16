/*global app */
/*global fabric */

(function () {
    
    'use strict';
    
    /** @namespace */
    app.fabric.util = {};
    
    function init() {
        var canvas = new fabric.Canvas('canvas', {
            selection : true
        });
        
        return canvas;
    }
    
    function makeLine(coords) {
        return new fabric.Line(coords, {
            fill : 'grey',
            strokeWidth : 5,
            selectable : false
        });
    }
    
    function makeCircle(left, top) {
        var c = new fabric.Circle({
            left : left,
            top : top,
            strokeWidth : 5,
            radius : 12,
            fill : 'black',
            stroke : 'grey',
            selectable : true
        });
        
        c.hasControls = c.hasBorders = true;
        c.lockMovementX = c.lockMovementY = c.lockRotation = c.lockScalingX = c.lockScalingY = true;
        c.parents = [];
        c.children = [];
        
        return c;
    }
    
    app.fabric.util.init = init;
    app.fabric.util.makeLine = makeLine;
    app.fabric.util.makeCircle = makeCircle;
    
}());