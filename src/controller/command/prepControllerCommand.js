/**
 * Created by Arthur on 2014/12/14.
 */
var puremvc = require('puremvc').puremvc;
var constants = require('../../appConstants.js');
var PlayerCommand = require('./playerCommand.js');
var TaskCommand = require('./taskCommand.js');
var TaskMonitorCommand = require('./taskMonitorCommand.js');
var BttleCommand = require('./battleCommand.js');

module.exports = puremvc.define({
        name: 'fighter.controller.command.PrepControllerCommand',
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
            cc.log('PrepControllerCommand execute');
            this.facade.registerCommand(constants.PLAYER_ACTION, PlayerCommand);
            this.facade.registerCommand(constants.LOVE_ACTION, PlayerCommand);
            this.facade.registerCommand(constants.TASK_ACTION, TaskCommand);
            this.facade.registerCommand(constants.TASK_ACTION_MONITOR, TaskMonitorCommand);
            this.facade.registerCommand(constants.FIGHT_ACTION, BttleCommand);
        }
    }
);