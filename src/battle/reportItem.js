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
    this.me_hp = 0;
    this.ememy_hp = 0;
};

ReportItem.prototype.setHp = function(name, val) {
    this[name] = val;
};

ReportItem.prototype.toJson = function() {
    return {
        me: this.me,
        me_hp: this.me_hp,
        ememy_hp: this.ememy_hp,
        ememy: this.ememy,
        damage: this.damage,
        isCrit: this.isCrit,
        isDodge: this.isDodge,
        isEnd: this.isEnd ? this.isEnd : void 0,
        winner: this.winner != null ? this.winner : void 0
    };
};

ReportItem.prototype.toString = function() {

    var res = [];
    if (this.isDodge) {
        res.push(this.me + '攻击' + this.ememy + ', ' + this.ememy + '闪避');
        return res;
    }

    var string =  this.me + '攻击' + this.ememy + ', 造成' + this.damage + '点伤害';
    if (this.isCrit) {
        string += '(暴击)';
    }
    res.push(string);

    if (this.isEnd) {
        res.push(this.winner + '击败了对手，凯旋而归');
    }

    return res;
};