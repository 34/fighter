/**
 * Created by Arthur on 2014/12/20.
 */
var res = require('../../resource.js').res;

module.exports = cc.Layer.extend({
    _rootNode: null,

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
        txt_title.string = '充值';
        var btn_back = titleNode.getChildByName('btn_back');
        btn_back.addClickEventListener(this.onBackListener.bind(this));
        rootNode.addChild(titleNode);
        return true;
    },

    onBackListener: function() {
        if (cc.isFunction(this.onBack)) {
            this.onBack();
        }
    },

    init: function(rows) {
        var y = cc.winSize.height - 240;
        var x = 0;
        for (var i = 0; i < rows.length; i++) {
            var row = rows[i];
            var node = ccs.csLoader.createNode(res.RechargeNode);
            var btnRecharge = node.getChildByName('btn_recharge');
            btnRecharge.titleText = '充值';
            btnRecharge.addClickEventListener(this.onRecharge.bind(this, row.id));

            var txtValue = node.getChildByName('txt_value');
            txtValue.string = cc.formatStr('￥ %d=%d砖石 送 %d砖石', row.money, row.money*10, row.gold);

            node.attr({
                x: x,
                y: y - i*120
            });
            this.addChild(node);
        }
    },

    onRecharge: function(id) {
        console.log('click id: ', id);
    }
});