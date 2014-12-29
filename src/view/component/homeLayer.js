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

        var btn_love = rootNode.getChildByName('main_panel').getChildByName('btn_love');
        btn_love.addClickEventListener(this.buttonLoveListener.bind(this));

        var btn_fight = rootNode.getChildByName('main_panel').getChildByName('btn_fight');
        btn_fight.addClickEventListener(this.buttonFightListener.bind(this));
    },

    update: function(player) {
        var node = this._rootNode;
        node.getChildByName('txt_gold').setString(player.get('gold'));

        node.getChildByName('main_panel').getChildByName('txt_hp').setString(player.get('hp'));
        node.getChildByName('main_panel').getChildByName('txt_atk').setString(player.get('atk'));
        node.getChildByName('main_panel').getChildByName('txt_defence').setString(player.get('defence'));
        node.getChildByName('main_panel').getChildByName('txt_undefence').setString(player.get('undefence'));
        node.getChildByName('main_panel').getChildByName('txt_crit').setString(player.get('crit'));
        node.getChildByName('main_panel').getChildByName('txt_uncrit').setString(player.get('uncrit'));
        node.getChildByName('main_panel').getChildByName('txt_doget').setString(player.get('doget'));
        node.getChildByName('main_panel').getChildByName('txt_hit').setString(player.get('hit'));
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
    }
});