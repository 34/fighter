/**
 * Created by Arthur on 2014/12/21.
 */
var res = require('../../resource.js').res;
var TrainItemController = require('./controller/trainItem');

var tasks = ["生命", "攻击", "防御", "破防", "暴击", "韧性", "闪避", "命中"];
var DEFAULT_COUNT = 100;
module.exports = cc.Layer.extend({
    ctor: function() {
        this._super();
        var trainNode = ccs.csLoader.createNode(res.TrainNode);
        this.addChild(trainNode);

        var btn_back = trainNode.getChildByName('Panel_1').getChildByName('btn_back');
        btn_back.addClickEventListener(this.onBackListener.bind(this));

        var size = cc.winSize;
        var baseY = size.height*84/100;
        for (var i = 0; i < tasks.length; i++) {
            var y = baseY - 100*(i+1);
            var taskNode = ccs.csLoader.createNode(res.TaskNode);
            taskNode.addComponent(TrainItemController.create(tasks[i], cc.p(0, y)));
            trainNode.addChild(taskNode);
        }

        return true;
    },

    onBackListener: function() {
        if (this.onBack) {
            this.onBack();
        }
    }
});