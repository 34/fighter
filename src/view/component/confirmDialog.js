/**
 * Created by Arthur on 2015/1/8.
 */
var res = require('../../resource.js').res;
var constants = require('../../appConstants.js');

module.exports = cc.Layer.extend({
    _title: null,
    _desc: null,
    _onConfirm: null,

    ctor: function (title, desc, callback) {
        this._super();

        var node = this._rootNode = ccs.csLoader.createNode(res.ConfirmNode);
        this.addChild(node);
        var size = cc.winSize;
        node.attr({
            x: size.width/2,
            y: size.height/2,
            anchorX: 0.5,
            anchorY: 0.5,
            width: 450,
            height: 250
        });

        this._title = node.getChildByName('panel_bg').getChildByName('txt_title');
        this._desc = node.getChildByName('panel_bg').getChildByName('txt_desc');
        this._btn_cancel = node.getChildByName('panel_bg').getChildByName('btn_cancel');
        this._btn_ok = node.getChildByName('panel_bg').getChildByName('btn_ok');

        this._btn_cancel.addClickEventListener(this.close.bind(this));
        this._btn_ok.addClickEventListener(this.onOkListener.bind(this));

        if (title) {
            this._title.string = title;
        }
        if (desc) {
            this._desc.string = desc;
        }

        if (callback) {
            this._onConfirm = callback;
        }
        return true;
    },

    setTitle: function(title) {
        this._title.string = title;
    },

    setDesc: function(desc) {
        this._desc.string = desc;
    },

    setOkCallback: function(fn) {
        this._onConfirm = fn;
    },

    close: function() {
        this.removeFromParent();
    },

    onOkListener: function() {
        if (this._onConfirm) {
            this._onConfirm.call(this);
        } else {
            this.close();
        }
    }
});