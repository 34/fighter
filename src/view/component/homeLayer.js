/**
 * Created by Arthur on 2014/12/20.
 */
var res = require('../../resource.js').res;

module.exports = cc.Layer.extend({
    _rootNode: null,

    ctor: function() {
        this._super();
        this._rootNode = ccs.csLoader.createNode(res.HomeNode);
        this.addChild(this._rootNode);
        return true;
    },

    init: function(player) {
        this._player = player;
        this.update(player);

        var rootNode = this._rootNode;
        var btn_train = rootNode.getChildByName('btn_train');
        btn_train.addClickEventListener(this.buttonTrainListener.bind(this));

        var btn_love = rootNode.getChildByName('btn_love');
        btn_love.addClickEventListener(this.buttonLoveListener.bind(this));

        var btn_fight = rootNode.getChildByName('btn_fight');
        btn_fight.addClickEventListener(this.buttonFightListener.bind(this));
    },

    update: function(player) {
        var node = this._rootNode;
        node.getChildByName('txt_gold').setString(player.get('gold'));

        node.getChildByName('txt_hp').setString(player.get('hp'));
        node.getChildByName('txt_atk').setString(player.get('atk'));
        node.getChildByName('txt_defence').setString(player.get('defence'));
        node.getChildByName('txt_undefence').setString(player.get('undefence'));
        node.getChildByName('txt_crit').setString(player.get('crit'));
        node.getChildByName('txt_uncrit').setString(player.get('uncrit'));
        node.getChildByName('txt_dodge').setString(player.get('dodge'));
        node.getChildByName('txt_hit').setString(player.get('hit'));
    },

    buttonTrainListener: function() {
        if (this.onTrain) {
            this.onTrain();
        }
    },

    buttonLoveListener: function() {
        if (this.onLove) {
            this.onLove();
        }
    },

    buttonFightListener: function() {
        if (this.onFight) {
            this.onFight();
        }
    },

    onTaskFinished: function(player) {
        this._player = player;
        this.update(player);
    }
});