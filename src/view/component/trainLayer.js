/**
 * Created by Arthur on 2014/12/21.
 */
var res = require('../../resource.js').res;

var tasks = ["生命", "攻击", "防御", "破防", "暴击", "韧性", "闪避", "命中"];
var DEFAULT_COUNT = 100;
module.exports = cc.Layer.extend({
    ctor: function() {
        this._super();
        var trainNode = ccs.csLoader.createNode(res.TrainNode);
        this.addChild(trainNode);

        var size = cc.winSize;
        var baseY = size.height*84/100;
        for (var i = 0; i < tasks.length; i++) {
            var y = baseY - 100*(i+1);
            var taskNode = ccs.csLoader.createNode(res.TaskNode);
            // 修改锚点无效，默认锚点为(0,0)
            taskNode.attr({
                x: 0,
                y: y
            });
            var task_name = taskNode.getChildByName('task_name');
            task_name.setString(tasks[i]);
            task_name.attr({
                anchorX: 0,
                anchorY: 0.5
            });
            var count_value = taskNode.getChildByName('count_value');
            count_value.setString(DEFAULT_COUNT + '次');
            count_value.attr({
                anchorX: 0,
                anchorY: 0.5
            });

            btn_start_task = taskNode.getChildByName('btn_start_task');
            btn_start_task.addClickEventListener(function() {

            });
            btn_start_task.setTitleText('开始任务');
            btn_start_task.setTitleFontSize(18);

            trainNode.addChild(taskNode);
        }

        return true;
    }
});