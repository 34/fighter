/**
 * Created by Arthur on 2015/1/10.
 */
var puremvc = require('puremvc').puremvc;
var constants = require('../../appConstants.js');

module.exports = puremvc.define(
    {
        name: 'fighter.view.mediator.FightMediator',
        parent: puremvc.Mediator
    },

    // instance members
    {
        /** @override */
        listNotificationInterests: function() {
            return [];
        },

        /** @override */
        handleNotification: function(note) {
            switch(note.getName()) {

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

            var FightLayer = require('./../component/fightLayer.js');
            self.viewComponent = new FightLayer();
            self.viewComponent.init();

            self.viewComponent.onBack = function() {
                self.sendNotification(constants.SCENE_ACTION, {name: constants.SCENE.HOME});
            };
        },

        getResource: function() {

        }

    },

    // static members
    {
        NAME: 'FightMediator'
    }
);