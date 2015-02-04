/**
 * Created by Arthur on 2015/1/31.
 */
var DURATION = 3000;

var Report = module.exports = function(items, isEnd, time, winner) {
    this.items = items || [];
    this._index = 0;
    this.startTime = new Date(time);
    this.winner = null;
};

Report.prototype.add = function(item) {
    this.items.push(item);
};

Report.prototype.isEnd = function() {
    var len = this.items.length;
    var duration = new Date().getTime() - this.startTime;
    return duration > 1000 * 3 * len;
};

Report.prototype.show = function() {
    var duration = new Date().getTime() - this.startTime;
    var count = Math.floor(duration/DURATION);
    if (count >= this._index) {
        var item = this.items[this._index++];
        if (item) {
            return item.toString();
        }
    }
};

Report.prototype.isWin = function() {
    return this.winner == '项羽';
};

Report.prototype.length = function() {
    return this.items.length;
};

Report.prototype.output = function() {
    return {
        isEnd: this.end,
        items: this.items.map(function(i) { return i.toJson();}),
        winner: this.winner
    }
};