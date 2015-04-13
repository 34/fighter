/**
 * Created by Arthur on 2014/12/20.
 */
var puremvc = require('puremvc').puremvc;
var constants = require('../../appConstants.js');
var PlayerProxy = require('../../model/proxy/playerProxy.js');

module.exports = puremvc.define(
    {
        name: 'fighter.view.mediator.RechargeMediator',
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

            var RechargeLayer = require('./../component/rechargeLayer.js');
            self.viewComponent = new RechargeLayer();
            self.viewComponent.init(this.getData());

            self.viewComponent.onBack = function() {
                self.sendNotification(constants.SCENE_ACTION, {name: constants.SCENE.HOME});
            };
        },

        getData: function() {
            return [
                {id: 1, money: 648, gold: 1000},
                {id: 2, money: 328, gold: 800},
                {id: 3, money: 198, gold: 600},
                {id: 4, money: 128, gold: 500},
                {id: 5, money: 68, gold: 300},
                {id: 6, money: 30, gold: 150},
                {id: 7, money: 6, gold: 60}
            ];
        },

        getResource: function() {

        }
    },

    // static members
    {
        NAME: 'RechargeMediator'
    }
)