/**
 * Created by Arthur on 2014/12/29.
 */
var res = require('../../resource.js').res;
var LoveItemController = require('./controller/loveItem');

module.exports = cc.Layer.extend({
    ctor: function() {
        this._super();

        var rootNode = this._rootNode = new cc.LayerColor(cc.color(51, 51, 51, 255));
        this.addChild(rootNode);

        var titleNode = ccs.csLoader.createNode(res.titleNode);
        titleNode.attr({
            x: 0,
            y: cc.winSize.height - 80
        });
        var txt_title = titleNode.getChildByName('txt_title');
        txt_title.string = '虞姬之爱';
        var btn_back = titleNode.getChildByName('btn_back');
        btn_back.addClickEventListener(this.onBackListener.bind(this));
        rootNode.addChild(titleNode);

        return true;
    },

    init: function(player, items) {
        var desc_bg = new cc.Sprite(res.gray_png);
        desc_bg.attr({
            width: 580,
            height: 56,
            anchorX: 0,
            anchorY: 0,
            x: 30,
            y: cc.winSize.height - 186
        });
        desc_bg.setScale(580/40, 56/40);
        this.addChild(desc_bg);

        var text_desc = this._txt_desc = new ccui.Text('', null, 28);
        text_desc.color = cc.color(51, 51, 51, 255);
        text_desc.attr({
            anchorY: 0.5,
            anchorX: 0,
            x: 50,
            y: cc.winSize.height - 158
        });
        this.addChild(text_desc);

        var p = cc.p(desc_bg.x, desc_bg.y);
        p.y = p.y - 133;
        var option, i;
        for(i = 0; i < items.length; i++) {
            option = items[i];
            option.position = cc.p(0, p.y - 100*i);

            var loveItem = ccs.csLoader.createNode(res.LoveItem);
            loveItem.addComponent(LoveItemController.create(option, player));
            this._rootNode.addChild(loveItem);
        }
        this.updateLv(player.get('loveLv'));
    },

    updateLv: function(lv) {
        this._txt_desc.setString('当前虞姬之爱' + lv + '级, 每天前90次献吻免费');
    },

    onBackListener: function() {
        if (cc.isFunction(this.onBack)) {
            this.onBack();
        }
    },

    onLoveListener: function() {
        if (cc.isFunction(this.showLoveConfirm)){
            this.showLoveConfirm();
        }
    }


});