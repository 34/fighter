/**
 * Created by Arthur on 2014/12/29.
 */

var TrainItemController = module.exports =  ccs.ComController.extend({
    ctor: function() {
        this._super();
        this._name = 'TrainItemController';
        this.DEFAULT_COUNT = 100;
    },

    init: function(task, pos) {
        this._task = task;
        this._position = pos;
    },

    onEnter: function() {
        if (this._position) {
            this.getOwner().setPosition(this._position);
        }

        var btn_start = this._btn_start = this.getOwner().getChildByName('btn_start_task');
        btn_start.setTitleFontSize(20);
        btn_start.addClickEventListener(this.startListener.bind(this));

        var btn_add_count = this._btn_add_count = this.getOwner().getChildByName('btn_count_add');
        btn_add_count.addClickEventListener(this.addCoundListener.bind(this));

        this._count = this.getOwner().getChildByName('count_value');
        this._count.setString(this.DEFAULT_COUNT);
        this._count.attr({anchorX: 0, anchorY: 0.5});

        this._task_name = this.getOwner().getChildByName('task_name');
        this._task_name.attr({anchorX: 0, anchorY: 0.5});
        this._task_name.setString(this._task.get('name') + ': 每次+' + this._task.get('obtainPerCount'));

        this._progress_bar = this.getOwner().getChildByName('progress_bar');
        this._progress_bar.attr({anchorX: 0, anchorY: 0.5});

        var txt_task_desc = this._txt_task_desc = this.getOwner().getChildByName('txt_task_desc');
        var txt_time = this._txt_time = this.getOwner().getChildByName('txt_time');
        txt_task_desc.attr({anchorX: 0, anchorY: 0.5});
        txt_time.attr({anchorX: 1, anchorY: 0.5});

        this.setTaskDesc();
    },

    startListener: function() {

        this._task.start(this.getCount());
        this.setTaskDesc();
        //this.getOwner().parent.parent.onStartTask(this._task);
    },

    setTaskButtonTitle: function() {
        if (this._task.isStarted() && !this._task.isFinished()) {
            this._btn_start.setTitleText('进行中...');
            this._btn_start.disabled = true;
            this._btn_start.bright = false;
        } else {
            this._btn_start.setTitleText('开始任务');
        }
    },

    setTaskDesc: function() {
        if (this._task.isStarted() && !this._task.isFinished()) {
            this._txt_task_desc.setString(cc.formatStr(
                '任务进行中，奖励 +%s',
                this._task.totalObtain()
            ));
            this._txt_time.string = this._task.timeLeftStr();
        } else {
            this._txt_task_desc.setString('执行任务可以增加相应的属性');
        }
        this.setTaskButtonTitle();
    },

    taskFinished: function() {
        this.setTaskDesc();
    },

    getCount: function() {
        return parseInt(this._count.getString());
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
