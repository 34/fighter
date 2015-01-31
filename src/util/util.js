/**
 * Created by Arthur on 2014/12/14.
 */

var util = module.exports = function() {};

util.hitRate = function(rate) {
    var rd = Math.random()*10000;
    return rate * 100 < rd;
};

util.extend = function(child, parent) {
    if ('function' !== typeof child)
        throw new TypeError('#extend- child should be Function');

    if ('function' !== typeof parent)
        throw new TypeError('#extend- parent should be Function');

    if (parent === child)
        return;

    var Transitive= new Function;
    Transitive.prototype= parent.prototype;
    child.prototype= new Transitive;
    return child.prototype.constructor= child;
};

util.decorate = function (object, traits) {
    for (var accessor in traits)
    {
        object[accessor]= traits[accessor];
    }

    return object;
};

util.global = (function(){return this})();

util.define = function(className, object, scope) {
    var nodes= className.split('.')
        ,   node= scope || util.global
        ,   lastNode
        ,   nodeName;

    for (var i= 0, n= nodes.length; i < n; i++)
    {
        lastNode= node;
        nodeName= nodes[i];

        node= (null == node[nodeName] ? node[nodeName] = {} : node[nodeName]);
    }
    if (object != null) {
        var Class = function() {};
        var prototype = Class.prototype;
        Class.implement = function(prop) {
            for (var name in prop) {
                prototype[name] = prop[name];
            }
        }

        prototype.NAME = className;
        node = util.extend(Class, object);
    }

    return node;
};