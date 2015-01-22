/**
 * Created by Arthur on 2014/12/29.
 */
var puremvc = require('puremvc').puremvc;
var constants = require('../../appConstants.js');
var PlayerProxy = require('../../model/proxy/playerProxy.js');

module.exports = puremvc.define(
    {
        name: 'fighter.view.mediator.LoveMediator',
        parent: puremvc.Mediator
    },

    // instance members
    {
        /** @override */
        listNotificationInterests: function() {
            return [constants.LOVE_ACTION];
        },

        /** @override */
        handleNotification: function(note) {
            switch (note.getName()){
                case constants.LOVE_ACTION:
                    this.loveSuccess(note.getBody());
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
            var LoveLayer = require('./../component/loveLayer.js');
            self.viewComponent = new LoveLayer();

            /*
            TODO: get love info
             */

            var playerProxy = this.facade.retrieveProxy(PlayerProxy.NAME);
            var player = playerProxy.getPlayer();

            self.viewComponent.init(player, this.getLoveItems());

            self.viewComponent.onBack = function() {
                self.sendNotification(constants.SCENE_ACTION, {name: constants.SCENE.HOME});
            };

            self.viewComponent.showLoveConfirm = function() {
                var playerProxy = self.facade.retrieveProxy(PlayerProxy.NAME);
                var player = playerProxy.getPlayer();

                var LoveConfirmLayer = require('./../component/loveConfirmLayer.js');
                var layer = new LoveConfirmLayer(player.get('gold'), player.get('dailyCount').freeLove);
                self.sendNotification(constants.SCENE_ACTION_ADD_CHILD, layer);
            };

            self.viewComponent.executeLove = function() {

            };
        },

        loveSuccess: function(data) {
            cc.log('dasdfasdfsafd--------', data);
        },

        getResource: function() {

        },

        getLoveItems: function() {
            return [
                {
                    lv: 1,
                    value: 1,
                    count: 10,
                    countNeed: 99
                },
                {
                    lv: 2,
                    value: 1,
                    count: 10,
                    countNeed: 99
                },
                {
                    lv: 3,
                    value: 1,
                    count: 10,
                    countNeed: 99
                },
                {
                    lv: 4,
                    value: 1,
                    count: 10,
                    countNeed: 99
                },
                {
                    lv: 5,
                    value: 1,
                    count: 10,
                    countNeed: 99
                },
                {
                    lv: 6,
                    value: 1,
                    count: 10,
                    countNeed: 99
                },
                {
                    lv: 7,
                    value: 1,
                    count: 10,
                    countNeed: 99
                },
                {
                    lv: 8,
                    value: 1,
                    count: 10,
                    countNeed: 99
                },
                {
                    lv: 9,
                    value: 1,
                    count: 10,
                    countNeed: 99
                }
            ]
        }

    },

    // static members
    {
        NAME: 'LoveMediator'
    }
);