/*global $ */
/*global app */

(function demo() {
    
    'use strict';
    
    /** @namespace */
    app.canvas = app.fabric.util.init();
    
    app.node.pop.init({
        tag : '#canvas',
        options : {
            title : 'Node Options',
            html : true,
            content : function () {
                
                return $('#popover_content').html();
            }
        }
    });
    
    app.canvas.add(app.fabric.util.makeCircle(250, 30));
    
    app.node.pop.addEvent({
        canvas : app.canvas,
        eventname : 'object:selected',
        selector : '#canvas',
        group : function () {
            
            $('#node-merge').css('display', 'inline');
            $('#node-edit').css('display', 'none');
        },
        single : function () {
            
            $('#node-merge').css('display', 'none');
            $('#node-edit').css('display', 'inline');
        }
    });
    
    app.node.pop.addEvent({
        canvas : app.canvas,
        eventname : 'selection:created',
        selector : '#canvas',
        group : function () {
            
            $('#node-merge').css('display', 'inline');
            $('#node-edit').css('display', 'none');
        },
        single : function () {
            
            $('#node-merge').css('display', 'none');
            $('#node-edit').css('display', 'inline');
        }
    });
    
    app.node.pop.addEvent({
        canvas : app.canvas,
        eventname : 'selection:cleared',
        selector : '#canvas',
        state : 'hide'
    });
    
    app.node.pop.addEvent({
        canvas : app.canvas,
        eventname : 'object:modified',
        selector : '#canvas',
        state : 'hide'
    });
    
    app.node.pop.addEvent({
        canvas : $(app.canvas),
        eventname : 'selection:cleared',
        eventType : 'bind',
        selector : '#canvas',
        state : 'hide'
    });
}());