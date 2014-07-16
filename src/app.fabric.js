/*global app */
/*global fabric */

(function () {
    
    'use strict';
    
    /** @namespace */
    app.fabric = {};
    
    fabric.Canvas.prototype.getAbsoluteCoords = function (object, useOriginalCoords) {
        useOriginalCoords = typeof useOriginalCoords !== 'undefined' ? useOriginalCoords : false;
        
        if (typeof object !== 'undefined') {
            if (useOriginalCoords) {
                return {
                    left : object.originalLeft + this._offset.left,
                    top : object.originalTop + this._offset.top
                };
            } else {
                return {
                    left : object.left + this._offset.left,
                    top : object.top + this._offset.top
                };
            }
        }
    };
    
}());