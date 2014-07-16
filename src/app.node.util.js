/*global $ */
/*global app */
/*global console */

(function () {
    
    'use strict';
    
    /** @nampspace */
    app.node.util = {};
    
    function findRef(obj, list, msg) {
        msg = typeof msg !== 'undefined' ? msg : 'ref';
        
        var left = obj.originalLeft || obj.left,
            top = obj.originalTop || obj.top,
            _left,
            _top,
            _return = null;
        
        $.each(list, function (_index, _value) {
            
            _left = _value.node.originalLeft || _value.node.left;
            _top = _value.node.originalTop || _value.node.top;
            
            console.log('current[' + left + ',' + top + ']' + msg + '[' + _left + ',' + _top + ']');
            if (top === _top && left === _left) {
                console.log('found node in ' + msg + ' @index:' + _index);
                _return = _index;
            }
        });
        
        return _return;
    }
    
    function repositionParentTree(node) {
        if (node && node.parents && node.parents.length > 1) {
            console.log('parents:' + node.parents.length);
            $.each(node.parents, function (_index, _value) {
                
                console.log('repositioning parent line x2:' + node.left + ' y2:' + _value.line.y2);
                _value.line.set({
                    'x2' : node.left,
                    'y2' : _value.line.y2
                });
            });
        }
    }
    
    function repositionChildTree(node, offset) {
        if (node && node.children) {
            $.each(node.children, function (index, value) {
            
                repositionChildTree(value.node, offset);
                console.log('repositioning child [x1:' + (value.line.x1 + offset) + ' y1:' + value.line.y1 + ' x2:' + (value.line.x2 + offset) + ' y2:' + value.line.y2 + ']');
                
                console.log('node.left:' + value.node.left + ' offset:' + offset);
                value.node.left += offset;
                
                value.line.set({
                    'x1' : value.line.x1 + offset,
                    'y1' : value.line.y1,
                    'x2' : value.line.x2 + offset,
                    'y2' : value.line.y2
                });
                
                repositionParentTree(value.node);// could prolly do this with offset??
            });
        }
    }
    
    function repositionChildren(obj) {
        var angle, _child, _offset, offset;
        console.log('active object children:' + obj.children.length);
        if (obj.children.length > 1) {
            
            app.util.leftSort(obj.children);
            
            angle = 180 / (obj.children.length + 1);
            console.log('angle per child:' + angle);
            $.each(obj.children, function (index, value) {
            
                console.log('additive x2:' + (90 - (angle * (index + 1))));
                _child = value;
                
                _offset = (90 - (angle * (index + 1)));
                offset = (_child.line.x2 + _offset);
                
                console.log('amount:' + _offset);
                console.log('x2:' + offset);
                _child.line.set({
                    'x2' : offset,
                    'y2' : _child.line.y2
                });
                _child.node.left = _child.line.x2;
                repositionChildTree(_child.node, _offset);
                repositionParentTree(_child.node);
            });
        } else {
            $.each(obj.parents, function (index, value) {});
        }
    }
        
    function _removeRefs(obj, list, msg) {
        var remove = null;
        msg = typeof msg !== 'undefined' ? msg : 'ref';
        
        remove = findRef(obj, list, msg);
        
        if (remove !== null) {
            list.splice(remove, 1);
            console.log('removing from ' + msg + ' @index:' + remove);
        }
    }
    
    function removeChildRefs(obj) {
        $.each(obj.children, function (index, value) {
            _removeRefs(obj, value.node.parents, 'parent');
            app.canvas.remove(value.line);
        });
    }
    
    function removeParentRefs(obj) {
        $.each(obj.parents, function (index, value) {
        
            _removeRefs(obj, value.node.children, 'child');
            app.canvas.remove(value.line);
        });
    }
           
    function removeObj(obj) {
        console.log('removing refs connected to this node');
        
        removeChildRefs(obj);
        removeParentRefs(obj);
        
        app.canvas.remove(obj);
    }
    
    app.node.util.findRef = findRef;
    app.node.util.repositionParentTree = repositionParentTree;
    app.node.util.repositionChildTree = repositionChildTree;
    app.node.util.repositionChildren = repositionChildren;
    app.node.util._removeRefs = _removeRefs;
    app.node.util.removeChildRefs = removeChildRefs;
    app.node.util.removeParentRefs = removeParentRefs;
    app.node.util.removeObj = removeObj;
        
}());
