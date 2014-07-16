/*global app */

(function () {
    
    'use strict';
    
    /** @namespace */
    app.util = {};
    
    function leftSort(nodes) {
        nodes.sort(function (a, b) {
            return (a.line.x2 < b.line.x2);
        });
    }
    
    function lowestSort(nodes) {
        nodes.sort(function (a, b) {
            return ((a.originalTop || a.top) > (b.originalTop || b.top));
        });
    }
    
    app.util.leftSort = leftSort;
    app.util.lowestSort = lowestSort;
    
}());