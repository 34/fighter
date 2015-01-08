/**
 * Created by Arthur on 2015/1/1.
 */
var puremvc = require('puremvc').puremvc;
var constants = require('../../appConstants.js');
var TaskProxyName = require('../../model/proxy/taskProxy.js').NAME;
var _ = require('underscore');

module.exports = puremvc.define({
        name: 'fighter.controller.command.TaskMonitorCommand',
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
            cc.log('TaskMonitorCommand execute', note.toString());

            cc.Director.sharedDirector.getScheduler()
                .scheduleCallbackForTarget(this, this.checkTaskStatus, 1, cc.REPEAT_FOREVER, 0, false);
        },

        checkTaskStatus: function() {
            cc.log('task monitor');
            var taskProxy = this.facade.retrieveProxy(TaskProxyName);
            var taskList = taskProxy.getData();
            var filtered = _.values(taskList).filter(function(task) {
                return task.get('status') == constants.TASK_STATUS.START;
            });

            for(var i = 0; i < filtered.length; i++) {
                var t = filtered[i];
                if (t.isFinished()) {
                    this.facade.sendNotification(
                        constants.TASK_ACTION,
                        t,
                        constants.TASK_ACTION_FINISHED
                    );
                    this.facade.sendNotification(
                        constants.PLAYER_ACTION,
                        t,
                        constants.TASK_ACTION_FINISHED
                    );
                }
            }
        }
    }
);