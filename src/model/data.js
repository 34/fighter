/**
 * Created by Arthur on 2015/1/31.
 */
var data = require('../../data/province.json');
var _ = require('underscore');

module.exports = (function() {
    var group = _.groupBy(data, function(i) {
        return i.pid;
    });

    var res = {};
    for(var i in group) {
        var val = group[i];
        res[i] = {
            id: i,
            province: val[0].province,
            cities: val
        };
    }
    return res;
})();