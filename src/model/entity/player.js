var Entity = require('./entity.js');
var cityConfig = require('../data.js');

var Player = module.exports = Entity.extend({
    ctor: function() {
        this._key = 'PlayerEntity';
        this._name = 'PlayerEntity';
        this._super.apply(this, arguments);

        this.on('loveCount.change', function(count) {

        });

        var self = this;
        this.on('city.change', function(city) {
            var data = cityConfig[self.get('province')];
            if (data && data.cities.length == city) {
                self.add('province', 1);
                self.set('city', 0);
                self.save();
            }
        });
    },

    init: function() {
        var isInited = this.fetch();
        if (!isInited) {
            this.create();
        }
    },

    create: function(name) {
        this.sets(Player.DEFAULT_DATA);
        this.set('name', name);
        this.save();
    },

    reduceDailyCount: function(name, count) {
        var dc = this.get('dailyCount');
        if (typeof dc[name] != 'undefined' && dc[name] > 0) {
            dc[name] = Math.max(0, dc[name] - count);
        }
    },

    winACity: function() {
        this.add('winCount', 1);
        this.add('city', 1);
    }
});

Player.LoveCountMap = {
    1: 99,
    2: 499,
    3: 1999,
    4: 4999,
    5: 9999
};

Player.DEFAULT_DATA = {
    name: '项羽',
    gold: 100,
    hp: 101,
    atk: 102,
    defence: 103,
    undefence: 104,
    crit: 5,
    uncrit: 5,
    dodge: 5,
    hit: 5,

    loveLv: 1,
    loveCount: 0,

    dailyCount: {
        freeLove: 90
    },
    province: 1,
    city: 0
};