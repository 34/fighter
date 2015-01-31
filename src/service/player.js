/**
 * Created by Arthur on 2015/1/31.
 */
var util = require('../util/util.js');
var ReportItem = require('./reportItem.js')

var DODGE_RATE = 20;
var CRIT_RATE = 20;

var Player = function(ent) {
    this.name = ent.name;

    this.hp = ent.hp;
    this.atk = ent.atk;
    this.defance = ent.defance;
    this.undefance = ent.defance;
    this.crit = ent.crit;
    this.uncrit = ent.uncrit;
    this.dodge = ent.dodge;
    this.hit = ent.hit;
};

Player.prototype.attack = function(ememy) {
    if (this.die()) {
        var item = new ReportItem(this.name, ememy.name, 0, false, false);
        item.isEnd = true;
        item.winner = ememy.name;
        return item;
    }

    var dodge = ememy.dodge - this.hit;

    if (dodge > 0) {
        if (util.hitRate(DODGE_RATE)) {
            return new ReportItem(this.name, ememy.name, 0, false, true);
        }
    }

    var damage = this.atk;
    damage = damage - (ememy.defance - this.undefance);

    var crit = this.crit - ememy.uncrit;
    if (crit > 0) {
        if (util.hitRate(CRIT_RATE)) {
            damage *= 1.5;
            return new ReportItem(this.name, ememy.name, damage, true, false);
        }
    }

    return new ReportItem(this.name, ememy.name, damage, false, false);
};

Player.prototype.die = function() {
    return this.hp <= 0;
};