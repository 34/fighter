/**
 * Created by Arthur on 2014/12/21.
 */
var res = require('../../resource.js').res;
var TrainItemController = require('./controller/trainItem');

module.exports = cc.Layer.extend({
    ctor: function() {
        this._super();
        var trainNode = this._trainNode = ccs.csLoader.createNode(res.TrainNode);
        this.addChild(trainNode);

        var btn_back = trainNode.getChildByName('Panel_1').getChildByName('btn_back');
        btn_back.addClickEventListener(this.onBackListener.bind(this));

        return true;
    },

    init: function(taskList) {
        var size = cc.winSize;
        var baseY = size.height*84/100;
        var i = 0;
        for (var id in taskList) {
            var task = taskList[id];
            var y = baseY - 100*(i+1);
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