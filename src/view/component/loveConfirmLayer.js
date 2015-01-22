/**
 * Created by Arthur on 2015/1/6.
 */
var res = require('../../resource.js').res;
var constants = require('../../appConstants.js');

module.exports = cc.Layer.extend({
    _count: 100,

    ctor: function(gold, freeCount) {
        this._super();
        this._gold = gold;
        this._freeCount = freeCount;

        var rootNode = this._rootNode = ccs.csLoader.createNode(res.LoveConfirmNode);
        this.addChild(rootNode);

        var wsize = cc.winSize;
        rootNode.attr({
            x: wsize.width/2,
            y: wsize.height/2,
            anchorX: 0.5,
            anchorY: 0.5,
            width: 450,
            height: 350
        });
        var panel = rootNode.getChildByName('panel');
        var btn_add = panel.getChildByName('btn_add');
        btn_add.addClickEventListener(this.onAddListener.bind(this));

        var btn_ok = panel.getChildByName('btn_ok');
        btn_ok.addClickEventListener(this.onOkListener.bind(this));

        var btn_cancel = panel.getChildByName('btn_cancel');
        btn_cancel.addClickEventListener(this.onCancelListener.bind(this));


        this._txt_desc = panel.getChildByName('txt_desc');
        this._txt_desc_str = this._txt_desc.getString();
        this._txt_count = panel.getChildByName('txt_count');
        this._txt_count_str = this._txt_count.getString();

        this.init(gold);
        return true;
    },

    init: function(gold) {
        this.updateCount(this._count, this._count - this._freeCount);
    },

    updateCount: function(count, gold) {
        this._txt_count.setString(cc.formatStr(this._txt_count_str, count));
        this._txt_desc.setString(cc.formatStr(this._txt_desc_str, count, gold, this._freeCount))
    },

    onAddListener: function() {
        this._count += 1;
        this.updateCount(this._count, this._count - this._freeCount);
    },

    onOkListener: function() {
        if (this._gold > (this._count - this._freeCount)) {
            cc.eventManager.dispatchCustomEvent(
                constants.CUSTOM_NOTICICATION,
                {
                    name: constants.LOVE_ACTION,
                    data: {
                        count: this._count,
                        gold: this._count - this._freeCount
                    }
                }
            );
            this.removeFromParent();
        } else {
            cc.log('钻石不足，请到充值界面充值');
            cc.eventManager.dispatchCustomEvent(
                constants.CUSTOM_NOTICICATION,
                {
                    name: constants.CONFIRM_DIALOG,
                    data: {
                        desc: '你的钻石不足以执行此次献吻\n确定去充值吗？',
                        callback: function() {
                            cc.eventManager.dispatchCustomEvent(
                                constants.CUSTOM_NOTICICATION,
                                {
                                    name: constants.SCENE_ACTION,
                                    data: {
                                        name: constants.SCENE.HOME
                                    }
                                }
                            );
                        }
                    }
                }
            );
        }
    },

    onCancelListener: function() {
        this.removeFromParent();
    }
});