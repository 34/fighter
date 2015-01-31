/**
 * Created by Arthur on 2015/1/31.
 */
var ReportItem = module.exports = function(me, ememy, damage, isCrit, isDodge) {
    this.me = me;
    this.ememy = ememy;
    this.damage = damage;
    this.isCrit = isCrit;
    this.isDodge = isDodge;

    this.isEnd = false;
    this.winner = null;
};

ReportItem.prototype.toJson = function() {
    return {
        me: this.me,
        ememy: this.ememy,
        damage: this.damage,
        isCrit: this.isCrit,
        isDodge: this.isDodge,
        isEnd: this.isEnd ? this.isEnd : void 0,
        winner: this.winner != null ? this.winner : void 0
    };
};

ReportItem.prototype.toString = function() {
    if (this.isEnd) {
        return '';
    }

    if (this.isDodge) {
        return this.ememy + '闪避';
    }

    var string =  this.me + '对' + this.ememy + '造成' + this.damage + '点伤害';
    if (this.isCrit) {
        string += '(暴击)';
    }
    return string;
};