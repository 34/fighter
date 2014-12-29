/**
 * Created by Arthur on 2014/12/29.
 */
var res = require('../../resource.js').res;
var LoveItemController = require('./controller/loveItem');

module.exports = cc.Layer.extend({
    ctor: function() {
        this._super();
        var rootNode = this._rootNode = ccs.csLoader.createNode(res.LoveLayer);
        this.addChild(rootNode);

        var btn_back = rootNode.getChildByName('btn_back');
        btn_back.addClickEventListener(this.onBackListener.bind(this));

        return true;
    },

    init: function(options) {
        if (!options) {
            var p = this._rootNode.getChildByName('desc_bg').getPosition();
            options = {
                lv: 1,
                value: 1,
                count: 10,
                countNeed: 99,
                position: cc.p(0, p.y - 133)
            };
        }
        this._txt_desc = this._rootNode.getChildByName('txt_desc');
        this.updateLv(options.lv || 1);

        var loveItem = ccs.csLoader.createNode(res.LoveItem);
        loveItem.addComponent(LoveItemController.create(options));
        this._rootNode.addChild(loveItem);
    },

    updateLv: function(lv) {
        this._txt_desc.setString('当前虞姬之爱' + lv + '级, 每天前90次献吻免费');
    },

    onBackListener: function() {
        if (cc.isFunction(this.onBack)) {
            this.onBack();
        }
    }
});