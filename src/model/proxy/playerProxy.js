/**
 * Created by Arthur on 2014/12/26.
 */
var puremvc = require('puremvc').puremvc;
var Player = require('../entity/player.js');
var constants = require('../../appConstants.js');

var PlayerProxy = module.exports = puremvc.define({
        name: 'figther.model.proxy.PlayerProxy',
        parent: puremvc.Proxy,

        constructor: function() {
            puremvc.Proxy.call(this, this.constructor.NAME);
            this.init();
        }
    },

    {
        init: function() {
            var player = new Player();
            this.setData(player);
        },

        getPlayer: function() {
            if (this.data != null) {
                return this.data;
            }
        },

        winACity: function() {
            this.data.winACity();
            this.data.save();
        },

        updatePlayer: function(name, value) {
            if (this.data != null) {
                this.data.set(name, value);
            }
        },

        updatePlayerByTask: function(task) {
            this.data.add(task.get('attr'), task.totalObtain());
            this.data.save();
        },

        updatePlayerByLove: function(love) {
            this.data.add('loveCount', love.count);
            this.data.reduceDailyCount('freeLove', love.count);
            this.data.add('gold', -love.gold);
            this.data.save();
            var loveCount = this.data.get('loveCount');
            var loveLv = this.data.get('loveLv');
            var needCount = Player.LoveCountMap[loveLv];
            if (needCount != null && needCount > 0) {
                if (loveCount >= needCount) {
                    this.data.add('loveLv', 1);
//                    this.facade.sendNotification(
//                        constants.PLAYER_ACTION
//                    );
                }
            }
        },

        setName: function(name) {
            this.data.set('name', name);
        }
    },

    {
        NAME: 'PlayerProxy'
    }
);