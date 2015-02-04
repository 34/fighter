/**
 * Created by Arthur on 2015/1/31.
 */
var util = require('../util/util.js');
var ReportItem = require('./reportItem.js')

var DODGE_RATE = 100;
var CRIT_RATE = 100;

var Player = module.exports = function(ent) {
    this.name = ent.name;

    this.hp = ent.hp;
    this.atk = ent.atk;
    this.defence = ent.defence;
    this.undefence = ent.undefence;
    this.crit = ent.crit;
    this.uncrit = ent.uncrit;
    this.dodge = ent.dodge;
    this.hit = ent.hit;
};

Player.prototype.attack = function(ememy) {
    var isDodge = isCrit = false;
    var dodge = ememy.dodge - this.hit;

    if (dodge > 0) {
        if (util.hitRate(dodge/DODGE_RATE)) {
            isDodge = true;
        }
    }

    if (isDodge) {
        var report = new ReportItem(this.name, ememy.name, 0, false, true);
        report.setHp('me_hp', this.hp);
        report.setHp('ememy_hp', ememy.hp);
        return report;
    }

    var damage = this.atk;
    damage = damage - (ememy.defence - this.undefence);

    var crit = this.crit - ememy.uncrit;
    if (crit > 0) {
        if (util.hitRate(crit/CRIT_RATE)) {
            isCrit = true;
        }
    }

    damage *= 1.5;
    // 上下浮动20%
    damage = Math.max(0, floatUpDown(damage));
    ememy.hp -= damage;
    report = new ReportItem(this.name, ememy.name, damage, isCrit, isDodge);
    report.setHp('me_hp', this.hp);
    report.setHp('ememy_hp', ememy.hp);
    return checkIsDie(this, ememy, report);
};

Player.prototype.die = function() {
    return this.hp <= 0;
};

var checkIsDie = function(self, ememy, report) {
    if (ememy.die()) {
        report.isEnd = true;
        report.winner = self.name;
    }
    return report;
};

var floatUpDown = function(damage) {
    return Math.round(damage*(1+(Math.random()*40 - 20)/100));
};