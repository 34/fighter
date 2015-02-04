/**
 * Created by Arthur on 2015/2/1.
 */
var puremvc = require('puremvc').puremvc;
var constants = require('../../appConstants.js');
var Entity = require('../entity/entity.js');

var ReportProxy = module.exports = puremvc.define({
        name: 'figther.model.proxy.ReportProxy',
        parent: puremvc.Proxy,

        constructor: function() {
            puremvc.Proxy.call(this, this.constructor.NAME);
        }
    },
    {
        saveReport: function(report) {
            new Entity().init('battle.report', report).save();
        },

        getReport: function() {
            var ent = new Entity().setKey('battle.report');
            if (ent.fetch()){
                return ent;
            }
        }
    },
    {
        NAME: 'ReportProxy'
    }
);