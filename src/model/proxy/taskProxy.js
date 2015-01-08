/**
 * Created by Arthur on 2015/1/2.
 */
var puremvc = require('puremvc').puremvc;
var Task = require('../entity/task.js');
var constants = require('../../appConstants.js');

var TaskProxy;
TaskProxy = module.exports = puremvc.define({
        name: 'figther.model.proxy.TaskProxy',
        parent: puremvc.Proxy,

        constructor: function () {
            puremvc.Proxy.call(this, this.constructor.NAME);
            this.init();
        }
    },

    {
        init: function () {
            var data = {};
            TaskProxy.Tasks.forEach(function(t) {
                data[t.id] = new Task(t);
            });

            this.setData(data);
        },

        startTask: function(task) {
            this.getData()[task.get('id')].start(task.get('count'));
        },

        finishTask: function(task) {
            this.getData()[task.get('id')].finish();
        },

        getTask: function(id) {
            return this.getDate()[id];
        },

        setTask: function(task) {
            return this.getData()[task.id] = task;
        },

        updateTask: function(task) {
            this.setTask(task).save();
        }
    },

    {
        NAME: 'TaskProxy'
    }
);

TaskProxy.Tasks = [
    {
        id: 1,
        name: '生命',
        attr: 'hp',
        startTime: 0,
        status: constants.TASK_STATUS.STOP,
        totalCount: 100,
        timePerCount: 100,//毫秒
        consumePerCount: 1,
        obtainPerCount: 20
    },
    {
        id: 2,
        name: '攻击',
        attr: 'atk',
        startTime: 0,
        status: constants.TASK_STATUS.STOP,
        totalCount: 100,
        timePerCount: 1000,
        consumePerCount: 1,
        obtainPerCount: 20
    },
    {
        id: 3,
        name: '防御',
        attr:'defence',
        startTime: 0,
        status: constants.TASK_STATUS.STOP,
        totalCount: 100,
        timePerCount: 10000,
        consumePerCount: 1,
        obtainPerCount: 20
    },
    {
        id: 4,
        name: '破防',
        startTime: 0,
        attr: 'undefence',
        status: constants.TASK_STATUS.STOP,
        totalCount: 100,
        timePerCount: 100000,
        consumePerCount: 1,
        obtainPerCount: 20
    },
    {
        id: 5,
        name: '暴击',
        attr: 'crit',
        startTime: 0,
        status: constants.TASK_STATUS.STOP,
        totalCount: 100,
        timePerCount: 100000,
        consumePerCount: 1,
        obtainPerCount: 20
    },
    {
        id: 6,
        name: '韧性',
        attr: 'uncrit',
        startTime: 0,
        status: constants.TASK_STATUS.STOP,
        totalCount: 100,
        timePerCount: 100000,
        consumePerCount: 1,
        obtainPerCount: 20
    },
    {
        id: 7,
        name: '闪避',
        attr: 'dodge',
        startTime: 0,
        status: constants.TASK_STATUS.STOP,
        totalCount: 100,
        timePerCount: 100000,
        consumePerCount: 1,
        obtainPerCount: 20
    },
    {
        id: 8,
        name: '命中',
        attr: 'hit',
        startTime: 0,
        status: constants.TASK_STATUS.STOP,
        totalCount: 100,
        timePerCount: 100000,
        consumePerCount: 1,
        obtainPerCount: 20
    }
];