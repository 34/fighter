/**
 * Created by Arthur on 2014/12/20.
 */
var puremvc = require('puremvc').puremvc;
var constants = require('../../appConstants.js');
var PlayerProxy = require('../../model/proxy/playerProxy.js');

module.exports = puremvc.define(
    {
        name: 'fighter.view.mediator.HomeMediator',
        parent: puremvc.Mediator
    },

    // instance members
    {
        /** @override */
        listNotificationInterests: function() {
            return [constants.PLAYER_ACTION];
        },

        /** @override */
        handleNotification: function(note) {
            switch(note.getName()) {
                case constants.PLAYER_ACTION:
                    this.viewComponent.update(this.getPlayer());
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


            var HomeLayer = require('./../component/homeLayer.js');
            self.viewComponent = new HomeLayer();
            self.viewComponent.init(this.getPlayer());

            self.viewComponent.onTrain = function(){
                self.sendNotification(constants.SCENE_ACTION, {name: constants.SCENE.TRAIN});
            };

            self.viewComponent.onLove = function(){
                self.sendNotification(constants.SCENE_ACTION, {name: constants.SCENE.LOVE});
            };

            self.viewComponent.onFight = function(){
                self.sendNotification(constants.SCENE_ACTION, {name: constants.SCENE.FIGHT});
            };
        },

        getPlayer: function() {
            var playerProxy = this.facade.retrieveProxy(PlayerProxy.NAME);
            return playerProxy.getPlayer();
        },

        getResource: function() {

        }
    },

    // static members
    {
        NAME: 'HomeMediator'
    }
)