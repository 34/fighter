/**
 * Created by Arthur on 2014/12/20.
 */
var puremvc = require('puremvc').puremvc;
var constants = require('../../appConstants.js');
var TaskProxy = require('../../model/proxy/taskProxy.js');

module.exports = puremvc.define(
    {
        name: 'fighter.view.mediator.TrainMediator',
        parent: puremvc.Mediator
    },

    // instance members
    {
        /** @override */
        listNotificationInterests: function() {
            return [constants.TASK_ACTION];
        },

        /** @override */
        handleNotification: function(note) {
            switch(note.getName()) {
                case constants.TASK_ACTION:
                    if (note.getType() == constants.TASK_ACTION_FINISHED) {
                        if(this.viewComponent) {
                            this.viewComponent.onTaskFinished(note.getBody());
                        }
                    }
                    break;
            }
        },

        /** @override */
        onRegister: function() {

        },

        /** @override */
        onRemove: function() {

        },

        init: function() {
            var self = this;

            var taskProxy = this.facade.retrieveProxy(TaskProxy.NAME);
            var taskList = taskProxy.getData();

            var TrainLayer = require('./../component/trainLayer.js');
            self.viewComponent = new TrainLayer();
            self.viewComponent.init(taskList);

            self.viewComponent.onBack = function() {
                self.sendNotification(constants.SCENE_ACTION, {name: constants.SCENE.HOME});
            };

            self.viewComponent.onTask = function(task) {
                self.sendNotification(constants.TASK_ACTION, task, constants.TASK_ACTION_START);
            };
        },

        getResource: function() {

        }

    },

    // static members
    {
        NAME: 'TrainMediator'
    }
);