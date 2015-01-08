/**
 * Created by Arthur on 2014/12/14.
 */
var puremvc = require('puremvc').puremvc;
var PlayerProxy = require('../../model/proxy/playerProxy.js');
var TaskProxy = require('../../model/proxy/taskProxy.js');

module.exports = puremvc.define({
        name: 'fighter.controller.command.PrepModelCommand',
        parent: puremvc.SimpleCommand
    },

    // INSTANCE MEMBERS
    {
        /**
         * Register Proxies with the Model
         * @override
         */
        execute: function (note) {
            cc.log('PrepModelCommand execute');
            this.facade.registerProxy(new PlayerProxy());
            this.facade.registerProxy(new TaskProxy());
        }
    }
);
