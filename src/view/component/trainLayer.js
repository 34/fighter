/**
 * Created by Arthur on 2014/12/21.
 */
var res = require('../../resource.js').res;
var TrainItemController = require('./controller/trainItem');

module.exports = cc.Layer.extend({
    ctor: function() {
        this._super();
        var trainNode = this._trainNode = new cc.LayerColor(cc.color(51, 51, 51, 255));
        this.addChild(trainNode);

        var titleNode = ccs.csLoader.createNode(res.titleNode);
        titleNode.attr({
            x: 0,
            y: cc.winSize.height - 80
        });
        var txt_title = titleNode.getChildByName('txt_title');
        txt_title.string = '演武场';
        var btn_back = titleNode.getChildByName('btn_back');
        btn_back.addClickEventListener(this.onBackListener.bind(this));
        trainNode.addChild(titleNode);

        this.schedule(this.updateTaskProgress, 1, cc.REPEAT_FOREVER);
        return true;
    },

    updateTaskProgress: function() {

    },

    init: function(taskList) {
        var size = cc.winSize;
        var baseY = size.height*90/100;
        var i = 0;
        for (var id in taskList) {
            var task = taskList[id];
            var y = baseY - 120*(i+1);
            var taskNode = ccs.csLoader.createNode(res.TaskNode);
            taskNode.addComponent(TrainItemController.create(task, cc.p(0, y)));
            this._trainNode.addChild(taskNode, 10, task.get('id'));
            i = i + 1;
        }
    },

    onBackListener: function() {
        if (this.onBack) {
            this.onBack();
        }
    },

    onStartTask: function(task) {
        if (this.onTask) {
            this.onTask(task);
        }
    },

    onTaskFinished: function(task) {
        var node = this._trainNode.getChildByTag(task.get('id'));
        var ctrl = node.getComponent('TrainItemController');
        if (ctrl) {
            ctrl.taskFinished();
        }
    }
});