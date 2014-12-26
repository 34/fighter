/**
 * Created by Arthur on 2014/12/26.
 */
var puremvc = require('puremvc');
var Player = require('../entity/player.js');

var PlayerProxy = puremvc.define({
        name: 'figther.model.proxy.PlayerProxy',
        parent: puremvc.Proxy,

        constructor: function() {
            puremvc.Proxy.prototype.call(this, this.constructor.NAME);

            this.setData(new Player({
                id: 1,
                name: "我家没人",
                photo: "",
                gold: 12937,

                hp: 302004,
                atk: 40930,
                defense: 29342,
                undefense: 12341,
                crit: 30,
                uncrit: 10,
                dodge: 20,
                hit: 10
            }));
        }
    },

    {

        getPlayer: function() {
            return this.data;
        },

        updatePlayer: function(name, value) {
            if (this.data != null) {
                this.data.set(name, value);
            }
        }
    },

    {
        NAME: 'PlayerProxy'
    }
);