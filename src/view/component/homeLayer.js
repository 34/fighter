/**
 * Created by Arthur on 2014/12/20.
 */
var res = require('../../resource.js').res;

module.exports = cc.Layer.extend({
    _rootNode: null,

    ctor: function() {
        this._super();
        this._rootNode = ccs.csLoader.createNode(res.MainNode);
        this.addChild(this._rootNode);
        return true;
    },

    init: function(player) {
        this.update(player);

        var rootNode = this._rootNode;
        var btn_train = rootNode.getChildByName('main_panel').getChildByName('btn_train');
        btn_train.addClickEventListener(this.buttonTrainListener.bind(this));
    },

    update: function(player) {
        var node = this._rootNode;
        node.getChildByName('main_panel').getChildByName('txt_hp').setString(player.hp);
        node.getChildByName('main_panel').getChildByName('txt_hp').setString(player.atk);
        node.getChildByName('main_panel').getChildByName('txt_hp').setString(player.hp);
        node.getChildByName('main_panel').getChildByName('txt_hp').setString(player.hp);
        node.getChildByName('main_panel').getChildByName('txt_hp').setString(player.hp);
        node.getChildByName('main_panel').getChildByName('txt_hp').setString(player.hp);
        node.getChildByName('main_panel').getChildByName('txt_hp').setString(player.hp);
        node.getChildByName('main_panel').getChildByName('txt_hp').setString(player.hp);
        node.getChildByName('main_panel').getChildByName('txt_hp').setString(player.hp);
        node.getChildByName('main_panel').getChildByName('txt_hp').setString(player.hp);
    },

    buttonTrainListener: function() {
        if (this.onTrain) {
            this.onTrain();
        }
    }
});