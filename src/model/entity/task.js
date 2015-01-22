var Entity = require('./entity.js');
var constants = require('../../appConstants.js');
var _ = require('underscore');

var Task = module.exports = Entity.extend({
    ctor: function (data) {
        this._name = "TaskEntity";
        this._key = "task";

        this._super(data);
    },

    init: function(data) {
        this._key = this._key + '.' + data.id;
        if (!this.fetch()) {
            this.create(data);
        }
    },

    create: function(data) {
        this.sets(data);
        this.save();
    },

    start: function (count) {
        this.sets({
            status: constants.TASK_STATUS.START,
            startTime: new Date().getTime(),
            totalCount: count || this._totalCount
        });
        this.save();
    },

    finish: function() {
        this.sets({
            status: constants.TASK_STATUS.FINISH
        });
        this.save();
    },

    isStarted: function() {
        return this.get('status') == constants.TASK_STATUS.START;
    },

    isFinished: function() {
        return this.timeLeft() <= 0;
    },

    timeLeft: function() {
        return (this.get('startTime') + this.get('totalCount') * this.get('timePerCount'))
            - new Date().getTime();
    },

    timeLeftStr: function() {
        var time = this.timeLeft();
        return this._timeString(time);
    },

    totalTime: function() {
        return this.get('totalCount')*this.get('timePerCount');
    },

    totalTimeStr: function() {
        return this._timeString(this.totalTime());
    },

    progressPercent: function() {
        return parseInt((this.totalTime() - this.timeLeft())/this.totalTime()*100);
    },

    totalObtain: function() {
        return this.get('obtainPerCount') * this.get('totalCount');
    },

    _timeString: function(ms) {
        var _str = '';
        var s = ms/1000;

        var timeMap = {
            day: 60 * 60 * 24,
            hour: 60 * 60,
            minute: 60
        };

        var d = parseInt(s / timeMap.day);
        if ( d > 0) {
            _str += ':' + d;
            s = s%timeMap.day;
        }

        var hour = parseInt(s / timeMap.hour);
        if (hour > 0) {
            _str += ':' + hour;
            s = s%timeMap.hour;
        }

        var minute = parseInt(s / timeMap.minute);
        if (minute > 0) {
            _str += ':' + minute;
            s = s%timeMap.minute;
        }

        _str += ':' + parseInt(s);
        return _str.slice(1);
    }
});
