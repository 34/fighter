/**
 * Created by Arthur on 2015/1/10.
 */
var res = require('../../resource.js').res;

module.exports = cc.Layer.extend({
    ctor: function() {
        this._super();
        var rootNode = this._rootNode = ccs.csLoader.createNode(res.FightNode);
        this.addChild(rootNode);

        var panel = rootNode.getChildByName('panel');

        var btn_back = panel.getChildByName('btn_back');
        btn_back.addClickEventListener(this.onBackListener.bind(this));

        this._sv_city_list = panel.getChildByName('sv_city_list');
        this._sv_city_list.attr({anchorX: 0, anchorY: 0.5});

        this._panel_console = panel.getChildByName('panel_console');
        this._txt_province = panel.getChildByName('txt_province');

        return true;
    },

    init: function(items) {
        var data = stateData;
        this._updateProvince(data.province);

        var citys = data.citys;
        var city, i,
            menu = new cc.Menu();
        menu.x = 0;
        menu.y = 0;
        var height = this._sv_city_list.height;

        for(i = 0; i < citys.length; i++) {
            city = citys[i];
            menu.addChild(this._createItem(city.name, i, height/2));
        }
        this._sv_city_list.addChild(menu);
    },

    _createItem: function(name, i, y) {
        var menuItem = new cc.MenuItemImage(
            res.btn1_jpg,
            res.btn3_png,
            res.btn3_png,
            this._onClickCityListener.bind(this, name),
            this
        );
        menuItem.attr({x: 20 + i * (menuItem.width+20), y: y, anchorX: 0, anchorY: 0.5});
        if (i == 0)
            menuItem.setEnabled(false);

        var label = new cc.LabelTTF(name);
        label.fontSize = 28;
        label.fontColor = cc.color(27, 150, 2);
        label.attr({x: menuItem.width/2, y: menuItem.height/2, anchorX: 0.5, anchorY: 0.5});
        menuItem.addChild(label);
        this._sv_city_list.innerWidth = (menuItem.width + 20) * (i+1);
        cc.log( this._sv_city_list.innerWidth);
        return menuItem;
    },

    _onClickCityListener: function(name) {
        cc.log('click city: ', name);
    },

    _updateProvince: function(name) {
        this._txt_province.string = name;
    },

    onBackListener: function() {
        if (this.onBack) {
            this.onBack();
        }
    }
});

var stateData = {
    id: 1,
    province: '司州',
    citys: [
        {
            id: 1,
            name: '河东',
            hp: 5,
            atk: 50,
            defence: 10,
            undefence: 10,
            crit: 10,
            uncrit: 10,
            dodge: 10,
            hit: 10
        },
        {
            id: 1,
            name: '平阳',
            hp: 5,
            atk: 50,
            defence: 10,
            undefence: 10,
            crit: 10,
            uncrit: 10,
            dodge: 10,
            hit: 10
        },
        {
            id: 1,
            name: '河内',
            hp: 5,
            atk: 50,
            defence: 10,
            undefence: 10,
            crit: 10,
            uncrit: 10,
            dodge: 10,
            hit: 10
        },
        {
            id: 1,
            name: '弘农',
            hp: 5,
            atk: 50,
            defence: 10,
            undefence: 10,
            crit: 10,
            uncrit: 10,
            dodge: 10,
            hit: 10
        },
        {
            id: 1,
            name: '河南',
            hp: 5,
            atk: 50,
            defence: 10,
            undefence: 10,
            crit: 10,
            uncrit: 10,
            dodge: 10,
            hit: 10
        },
        {
            id: 1,
            name: '尹等',
            hp: 5,
            atk: 50,
            defence: 10,
            undefence: 10,
            crit: 10,
            uncrit: 10,
            dodge: 10,
            hit: 10
        },
        {
            id: 1,
            name: '四郡',
            hp: 5,
            atk: 50,
            defence: 10,
            undefence: 10,
            crit: 10,
            uncrit: 10,
            dodge: 10,
            hit: 10
        },
        {
            id: 1,
            name: '一尹',
            hp: 5,
            atk: 50,
            defence: 10,
            undefence: 10,
            crit: 10,
            uncrit: 10,
            dodge: 10,
            hit: 10
        },
        {
            id: 1,
            name: '四尹',
            hp: 5,
            atk: 50,
            defence: 10,
            undefence: 10,
            crit: 10,
            uncrit: 10,
            dodge: 10,
            hit: 10
        },
        {
            id: 1,
            name: '上音',
            hp: 5,
            atk: 50,
            defence: 10,
            undefence: 10,
            crit: 10,
            uncrit: 10,
            dodge: 10,
            hit: 10
        }
    ]

}