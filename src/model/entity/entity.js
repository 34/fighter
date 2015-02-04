/**
 * Created with JetBrains WebStorm.
 * User: lcc3536
 * Date: 13-7-9
 * Time: 下午5:24
 * To change this template use File | Settings | File Templates.
 */


/*
 * entity
 * */

var Event = require('../../util/event.js');

var Entity = module.exports = Event.extend({
    ctor: function() {
        this._data = {};
        this.init.apply(this, arguments);
    },

    init: function(key, data) {
        this._key = key;
        this.sets(data);
        return this;
    },

    save: function() {
        if (this._key) {
            cc.sys.localStorage.setItem(this._key, JSON.stringify(this._data));
        }
    },

    setKey: function(key) {
        this._key = key;
        return this;
    },

    fetch: function() {
        if (this._key) {
            var data = cc.sys.localStorage.getItem(this._key);

            if (!data) {
                return false;
            }

            try{
                var attrs = JSON.parse(data);
                this.sets(attrs);
                return true;
            } catch(e) {
                cc.error('can not parse entity data: ', data);
            }
        }
        return false;
    },

    create: function() {

    },

    getData: function() {
        return this._data;
    },

	set: function (name, value) {
		if (typeof value != "undefined") {
			if (this._data[name] !== value) {
				this._data[name] = value;
			}

			this.emit(name + ".change", value);
		}
	},

	sets: function (attrs) {
		var key;

		for (key in attrs) {
			this.set(key, attrs[key]);
		}
	},

	get: function (name) {
		return this._data[name];
	},

    add: function(name, value) {
        var val = this.get(name);
        this.set(name, value + val);
    },

	has: function (name) {
		return (typeof (this._data[name]) != "undefined");
	},

    toJson: function() {
        return this._data;
    },

	schedule: function (fn, interval, repeat, delay) {
		interval = interval || 0;
		repeat = (repeat == null) ? cc.REPEAT_FOREVER : repeat;
		delay = delay || 0;

		cc.Director.sharedDirector.getScheduler().scheduleCallbackForTarget(this, fn, interval, repeat, delay, false);
	},

	scheduleOnce: function (fn, delay) {
		this.schedule(fn, 0.0, 0, delay);
	},

	unschedule: function (fn) {
		// explicit nil handling
		cc.Director.sharedDirector.getScheduler().unscheduleCallbackForTarget(this, fn);
	},

	unscheduleAllCallbacks: function () {
		cc.Director.sharedDirector.getScheduler().unscheduleAllCallbacksForTarget(this);
	}
});
