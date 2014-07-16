/*global $ */
/*global app */
/*global console */

(function () {
    
    'use strict';
    
    /** @namespace */
    app.node.pop = {};
    
    function init(obj) {
        obj.options = obj.options || {};
        if (obj.tag !== null) {
            $(obj.tag).popover(obj.options);
        }
    }
    
    function addEvent(obj) {
        obj.eventType = typeof obj.eventType !== 'undefined' ? obj.eventType : 'on';
        obj.state = typeof obj.state !== 'undefined' ? obj.state : 'show';
        obj.group = typeof obj.group !== 'undefined' ? obj.group : function () {};
        obj.single = typeof obj.single !== 'undefined' ? obj.single : function () {};
        
        if (obj.eventType === 'bind') {
            if (obj.canvas !== null && obj.eventname !== null) {
                obj.canvas.bind(obj.eventname, function (e) {
                    if (obj.selector !== null) {
                        $(obj.selector).popover(obj.state);
                    }
                });
            }
        } else {
            if (obj.canvas !== null && obj.eventname !== null) {
                obj.canvas.on(obj.eventname, function (e) {
                
                    var maxLeft = null, o, abs, p;
                    
                    console.log(obj.eventname);
                    if (app.canvas.getActiveGroup()) {
                        app.canvas.getActiveGroup().forEachObject(function (o) {
                            if (typeof o !== 'undefined') {
                                console.log('group[' + o.originalTop + ',' + o.originalLeft + ']');
                                maxLeft = Math.max(maxLeft, obj.canvas.getAbsoluteCoords(o, true).left);
                            }
                        });
                        obj.group();
                    } else {
                        o = app.canvas.getActiveObject();
                        if (o !== null) {
                            console.log('single[' + o.top + ',' + o.left + ']');
                            maxLeft = Math.max(maxLeft, obj.canvas.getAbsoluteCoords(o).left);
                        }
                        obj.single();
                    }
                    
                    if (obj.selector !== null) {
                        $(obj.selector).popover(obj.state);
                    }
                    
                    abs = obj.canvas.getAbsoluteCoords(e.target);
                    
                    if (typeof abs !== 'undefined') {
                        console.log('top:' + abs.top + ' left:' + abs.left);
                        
                        p = $('.popover.fade.right.in');
                        console.log('height:' + p.height());
                        
                        p.css({
                            left : Math.max(maxLeft, abs.left) + 20,
                            top : abs.top - p.height() / 2
                        });
                    }
                    
                });
            }
        }
    }
    
    app.node.pop.init = init;
    app.node.pop.addEvent = addEvent;
    
}());
