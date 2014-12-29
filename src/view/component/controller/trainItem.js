/**
 * Created by Arthur on 2014/12/29.
 */

var TrainItemController = module.exports =  ccs.ComController.extend({
    ctor: function() {
        this._super();
        this._name = 'TrainItemController';
        this.DEFAULT_COUNT = 100;
    },

    init: function(name, pos) {
        this._taskName = name;
        this._position = pos;
    },

    onEnter: function() {
        if (this._position) {
            this.getOwner().setPosition(this._position);
        }

        var btn_start = this._btn_start = this.getOwner().getChildByName('btn_start_task');
        btn_start.setTitleText('开始任务');
        btn_start.setTitleFontSize(20);
        btn_start.addClickEventListener(this.startListener.bind(this));

        var btn_add_count = this._btn_add_count = this.getOwner().getChildByName('btn_count_add');
        btn_add_count.addClickEventListener(this.addCoundListener.bind(this));

        this._count = this.getOwner().getChildByName('count_value');
        this._count.setString(this.DEFAULT_COUNT);
        this._count.attr({anchorX: 0, anchorY: 0.5});

        this._task_name = this.getOwner().getChildByName('task_name');
        this._task_name.attr({anchorX: 0, anchorY: 0.5});
        this._task_name.setString(this._taskName);

        var txt_task_desc = this._txt_task_desc = this.getOwner().getChildByName('txt_task_desc');
        txt_task_desc.attr({anchorX: 0, anchorY: 0.5});
    },

    startListener: function() {
        this._btn_start.setTitleText('进行中...');
        this.setTaskDesc('任务进行中，将在12个小时之后完成！')
    },

    setTaskDesc: function(val) {
        this._txt_task_desc.setString(val);
    },

    addCoundListener: function() {
        this._count.setString(parseInt(this._count.getString()) + 1);
    },

    reduceCountListener: function() {

    }
});

TrainItemController.create = function(name, pos) {
    var con = new TrainItemController();
    con.init(name, pos);
    return con;
}
