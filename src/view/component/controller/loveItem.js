/**
 * Created by Arthur on 2014/12/29.
 */
var _ = require('underscore');
var res = require('../../../resource.js').res;

var LoveItemController = module.exports =  ccs.ComController.extend({
    ctor: function() {
        this._super();
        this._name = "LoveItemController";
        this._lv = 1;
        this._position = null;
    },

    init: function(options, player) {
        if (!options || _.isEmpty(options)) {
            options = LoveItemController.DEFAULT_OPTIONS;
        }

        this._options = options;
        this._loveLv = player.get('loveLv');
        this._loveFreeCount = player.get('dailyCount').freeLove;
        return true;
    },

    onEnter: function() {
        this.getOwner().setPosition(this._options.position);

        var txt_value = this._txt_value = this.getOwner().getChildByName('txt_value');
        txt_value.attr({anchorX: 0, anchorY: 0.5});
        txt_value.setString('+' + this._options.value);

        var txt_count = this._txt_count = this.getOwner().getChildByName('txt_count');
        txt_count.attr({anchorX: 0, anchorY: 0.5});
        txt_count.setString(this._options.count + '/' + this._options.countNeed + '次');

        this._lv_bg = this.getOwner().getChildByName('lv_bg');
        var txt_lv = this._txt_lv = this.getOwner().getChildByName('txt_lv');
        txt_lv.attr({anchorX: 0.5, anchorY: 0.5});
        txt_lv.setString(this._options.lv + '级');

        var btn_love = this._btn_love = this.getOwner().getChildByName('btn_love');
        btn_love.setTitleText('献吻');
        btn_love.addClickEventListener(this.loveListener.bind(this));

        var desc_bg = this.getOwner().getChildByName('desc_bg');
        desc_bg.attr({anchorX: 0.5, anchorY: 0.5});

        if (this._loveLv == this._options.lv) {
            this._lv_bg.setTexture(res.love_lv_bg_png);
        } else {
            btn_love.enabled = false;
            btn_love.bright = false;
        }
    },

    loveListener: function() {
        this.getOwner().parent.parent.onLoveListener();
    }
});

LoveItemController.create = function(player, options) {
    var con = new LoveItemController();
    con.init(player, options);
    return con;
}

LoveItemController.DEFAULT_OPTIONS = {
    lv: 1,
    value: 1,
    count: 10,
    countNeed: 99,
    position: cc.p(0, 0)
};