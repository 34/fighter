/**
 * Created by Arthur on 2015/1/25.
 */
var puremvc = require('puremvc').puremvc;
var constants = require('../../appConstants.js');
var PlayerProxyName = require('../../model/proxy/playerProxy.js').NAME;

module.exports = puremvc.define({
        name: 'fighter.controller.command.BattleCommand',
        parent: puremvc.SimpleCommand
    },

    // INSTANCE MEMBERS
    {
        /**
         * Register Commands with the Controller
         * @override
         */
        execute: function (note) {
            // This registers multiple notes to a single command which performs different logic based on the note name.
            // In a more complex app, we'd usually be registering a different command to each notification name.
            cc.log('BattleCommand execute');

            var player = this.facade.retrieveProxy(PlayerProxyName);
            var city = note.getBody();
        }
    }
);

