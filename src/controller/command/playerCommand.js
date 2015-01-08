/**
 * Created by Arthur on 2015/1/1.
 */
var puremvc = require('puremvc').puremvc;
var constants = require('../../appConstants.js');
var PlayerProxyName = require('../../model/proxy/playerProxy.js').NAME;

module.exports = puremvc.define({
        name: 'fighter.controller.command.PlayerCommand',
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
            cc.log('HomeCommand execute');

            var playerProxy = this.facade.retrieveProxy(PlayerProxyName);

            switch(note.getName()) {
                case constants.PLAYER_ACTION:
                    playerProxy.updatePlayer(note.getBody());

                    if (note.getType() == constants.TASK_ACTION_FINISHED) {
                        playerProxy.updatePlayerByTask(note.getBody());
                    }
                    break;
                case constants.LOVE_ACTION:
                    playerProxy.updatePlayerByLove(note.getBody());
                    break;
            }
        }
    }
);