/*global app */

(function () {
    
    'use strict';
    
    /** @namespace */
    app.node = {};
    
    
    function Node(node, line) {
        this.node = node;
        this.line = line;
    }
    
    app.node.Node = Node;
    
}());