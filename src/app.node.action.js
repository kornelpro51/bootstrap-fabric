/*global $ */
/*global app */
/*global console */


(function () {
    
    'use strict';
    
    /** @namespace */
    app.node.action = {};
        
    function addLink() {
        console.log('add Link');
    }
    
    function _mergeNode(child, parent) {
        
        var line,
            childLeft = child.originalLeft || child.left,
            childTop = child.originalTop || child.top,
            childHeight = child.height,
            parentLeft = parent.originalLeft || parent.left,
            parentTop = parent.originalTop || parent.top,
            parentHeight = parent.height;
        
        console.log('parentLeft:' + parentLeft + ' parentTop:' + parentTop + ' height:' + parentHeight);
        console.log('childLeft:' + childLeft + ' childTop:' + childTop + ' height:' + childHeight);
        
        console.log('corrds:[' + parentLeft, (parentTop + (parentHeight / 2)), childLeft, childTop - (childHeight / 2) + ']');
        line = app.fabric.util.makeLine([
            parentLeft, (parentTop + (parentHeight / 2)), childLeft, childTop - (childHeight / 2)
        ]);
        
        return line;
    
    }
    
    function mergeNode(e) {
        console.log('merge Node');
    
        if (app.canvas.getActiveGroup()) {
            var list = app.canvas.getActiveGroup().getObjects(), current, next, line, child, parent;
            app.canvas.discardActiveGroup();
            
            $(app.canvas).trigger('selection:cleared');
            
            app.util.lowestSort(list);
            
            console.log('active group:' + list.length);
            $.each(list, function (index, value) {
                $.each(list, function (_index, _value) {
                    console.log('index:' + index + ' _index:' + _index + ' list.length-1:' + (list.length - 1));
                    if (_index < list.length - 1) {
                        
                        current = value;
                        next = _value;
                        
                        console.log('current.originalTop:' + current.originalTop + ' next.originalTop:' + next.originalTop);
                        if (current.originalTop !== next.originalTop) {
                        
                            if (app.node.util.findRef(next, current.parents, 'parents') === null && app.node.util.findRef(next, current.children, 'children') === null) {
                                console.log('merging nodes');
                                
                                if (current.originalTop > next.originalTop) {
                                
                                    line = _mergeNode(current, next);
                                    child = new app.node.Node(current, line);
                                    parent = new app.node.Node(next, line);
                                    
                                    current.parents.push(parent);
                                    next.children.push(child);
                                    
                                    app.canvas.add(line);
                                } else {
                                    line = _mergeNode(next, current);
                                    child = new app.node.Node(next, line);
                                    parent = new app.node.Node(current, line);
                                    
                                    next.parents.push(parent);
                                    current.children.push(child);
                                    
                                    app.canvas.add(line);
                                }
                            }
                        }
                    }
                });
            });
            app.canvas.renderAll();
        } else {
            return;
        }
    }
    
    function _addNode(obj, left, top, height) {
        var SPACE = 60, line, circle, child, parent;
        
        left = typeof left !== 'undefined' ? left : obj.left;
        top = typeof top !== 'undefined' ? top : obj.top;
        height = typeof height !== 'undefined' ? height : obj.height;
        
        console.log('left:' + left + ' top:' + top + ' height:' + height);
        
        console.log('corrds:[' + left, (top + (height / 2)), left, (top - (height / 2) + SPACE) + ']');
        line = app.fabric.util.makeLine([
            left, (top + (height / 2)), left, (top - (height / 2) + SPACE)
        ]);
        
        console.log('X:' + left + ' Y:' + (top + SPACE));
        circle = app.fabric.util.makeCircle(left, (top + SPACE));
        
        child = new app.node.Node(circle, line);
        obj.children.push(child);
        
        parent = new app.node.Node(obj, line);
        circle.parents.push(parent);
        
        app.node.util.repositionChildren(obj);
        
        app.canvas.add(circle);
        app.canvas.add(line);
    }
    
    function addNode(e) {
        console.log('add Node');
        
        if (app.canvas.getActiveGroup()) {
            app.canvas.getActiveGroup().forEachObject(function (o) {
                _addNode(o, o.originalLeft, o.originalTop, o.height);
                app.canvas.getActiveGroup().removeWithUpdate(o);
            });
            
            app.canvas.discardActiveGroup();
            $(app.canvas).trigger('selection:cleared');
        } else {
            _addNode(app.canvas.getActiveObject());
        }
        
        app.canvas.renderAll();
    }
    
    function editNode(e) {
        console.log('edit Node');
        var obj = app.canvas.getActiveObject();
        
        if (app.canvas.getActiveGroup()) {
            return;
        }
    }
    
    function deleteNode(e) {
        console.log('delete Node');
        
        if (app.canvas.getActiveGroup()) {
            app.canvas.getActiveGroup().forEachObject(function (o) {
                app.node.util.removeObj(o);
            });
            app.canvas.discardActiveGroup().renderAll();
            $(app.canvas).trigger('selection:cleared');
        } else {
            app.node.util.removeObj(app.canvas.getActiveObject());
            $(app.canvas).trigger('selection:cleared');
            app.canvas.renderAll();
        }
    }
    
    app.node.action.addLink = addLink;
    app.node.action._mergeNode = _mergeNode;
    app.node.action.mergeNode = mergeNode;
    app.node.action._addNode = _addNode;
    app.node.action.addNode = addNode;
    app.node.action.editNode = editNode;
    app.node.action.deleteNode = deleteNode;
    
}());