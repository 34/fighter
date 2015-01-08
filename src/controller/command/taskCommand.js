/**
 * Created by Arthur on 2015/1/1.
 */
var puremvc = require('puremvc').puremvc;
var constants = require('../../appConstants.js');
var TaskProxyName = require('../../model/proxy/taskProxy.js').NAME;

module.exports = puremvc.define({
        name: 'fighter.controller.command.TaskCommand',
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
            cc.log('TaskCommand execute', note.toString());

            var taskProxy = this.facade.retrieveProxy(TaskProxyName);

            switch(note.getType()) {
                case constants.TASK_ACTION_START:
                    taskProxy.startTask(note.getBody());
                    break;
                case constants.TASK_ACTION_FINISHED:
                    taskProxy.finishTask(note.getBody());

                    break;
            }
        }
    }
);