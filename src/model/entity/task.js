var constants = require('../../appConstants.js');

var Task = module.exports = Entity.extend({
    ctor: function () {
        this._type = "";
        this._startTime = 0;
        this._status = constants.TASK_STATUS.STOP;
        this._timePerCount = 0;
        this._consumePerCount = 0;
        this._obtainPerCount = 0;
        this._totalCount = 0;
    },

    start: function (count) {
        this.sets({
            status: TASK_STATUS.START,
            startTime: new Date().getTime(),
            totalCount: count || this._totalCount
        });

        if (cc.isFunction(this.execute)) {
            this.schedule(this.execute, 600);
        }
    },

    isStarted: function() {
        return this._status == constants.TASK_STATUS.START;
    },

    timeLeft: function() {
        return new Date().getTime() - this._startTime;
    },

    totalObtain: function() {
        return this._obtainPerCount * this._totalCount;
    },

    getCurrentInfo: function () {
        return {
            type: this._type,
            startTime: this._startTime,
            timeLeft: this.timeLeft(),
            status: this._status,
            totalObtain: this.totalObtain(),
            totalCount: this._totalCount
        };
    }
});
