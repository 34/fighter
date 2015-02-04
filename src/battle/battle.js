/**
 * Created by Arthur on 2015/1/31.
 */
var Report = require('./report.js');
var Player = require('./player.js');

var Battle = module.exports = function(options) {
    this.player = new Player(options.player);
    this.ememy = new Player(options.ememy);
    this.report = new Report(null, false, new Date());
};

Battle.prototype.execute = function() {
    while(!this.end()) {
        this.round();
    }
    return this.report;
};

Battle.prototype.end = function() {
    return this.player.die() || this.ememy.die();
};

Battle.prototype.round = function(){
    this.addReportItem(this.player.attack(this.ememy));
    if(!this.end())
        this.addReportItem(this.ememy.attack(this.player));
};

Battle.prototype.addReportItem = function(item) {
    cc.log('item:', item);
    if (item.isEnd) {
        this.report.winner = item.winner;
    }
    this.report.add(item);

};

