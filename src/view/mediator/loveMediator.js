/**
 * Created by Arthur on 2014/12/29.
 */
var puremvc = require('puremvc').puremvc;
var constants = require('../../appConstants.js');

module.exports = puremvc.define(
    {
        name: 'fighter.view.mediator.LoveMediator',
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

        },

        /** @override */
        onRegister: function() {

        },

        /** @override */
        onRemove: function() {

        },

        init: function() {
            var self = this;
            var LoveLayer = require('./../component/loveLayer.js');
            self.viewComponent = new LoveLayer();

            /*
            TODO: get love info
             */
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
        NAME: 'LoveMediator'
    }
);