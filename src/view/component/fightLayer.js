/**
 * Created by Arthur on 2015/1/10.
 */
var res = require('../../resource.js').res;

module.exports = cc.Layer.extend({
    ctor: function() {
        this._super();

        var rootNode = this._rootNode = new cc.LayerColor(cc.color(51, 51, 51, 255));
        this.addChild(rootNode);

        this.addTitle();
        this.loadCities();
        this.initConsole();

        return true;
    },

    initConsole: function() {
        var console_bg = new ccui.ImageView();
        console_bg.loadTexture(res.gray_png);
        console_bg.setScale9Enabled(true);
        console_bg.attr({
            width: 580,
            height: 700 + (cc.winSize.height - 1136),
            x: cc.winSize.width/2,
            y: cc.winSize.height - 210,
            anchorX: 0.5,
            anchorY: 1
        });
        this.addChild(console_bg);
    },

    addTitle: function() {
        var titleNode = this._titleNode = ccs.csLoader.createNode(res.titleNode);
        titleNode.attr({
            x: 0,
            y: cc.winSize.height - 80
        });
        var txt_title = titleNode.getChildByName('txt_title');
        txt_title.string = '雄霸天下';
        var btn_back = titleNode.getChildByName('btn_back');
        btn_back.addClickEventListener(this.onBackListener.bind(this));
        this._rootNode.addChild(titleNode, 2);

        var province_bg = new ccui.ImageView();
        province_bg.loadTexture(res.blue_png);
        province_bg.setScale9Enabled(true);
        province_bg.attr({
            width: 180,
            height: 120,
            x: cc.winSize.width/2,
            y: 40,
            anchorX: 0.5,
            anchorY: 0
        });
        this._rootNode.addChild(province_bg);

        var txt_province = this._txt_province = new cc.LabelTTF('无名氏', null, 54);
        txt_province.attr({
            x: province_bg.width/2,
            y: province_bg.height/2,
            anchorX: 0.5,
            anchorY: 0.5
        });
        province_bg.addChild(txt_province);
    },

    loadCities: function(data) {
        var scrollView = new ccui.ScrollView();
        scrollView.setDirection(ccui.ScrollView.DIR_HORIZONTAL);
        scrollView.setTouchEnabled(true);
        scrollView.setContentSize(cc.size(580, 80));
        scrollView.setInertiaScrollEnabled(true);
        scrollView.x = 30;
        scrollView.y = cc.winSize.height - 190;
        var scrollViewRect = scrollView.getContentSize();

        var imgView = new ccui.ImageView();
        imgView.loadTexture(res.gray_png);
        imgView.setScale9Enabled(true);
        imgView.attr({width: 580, height: 80, anchorX: 0, anchorY: 0});
        imgView.x = scrollView.x;
        imgView.y = scrollView.y;
        this.addChild(imgView);

        var city, i, cities = data || stateData.citys;;
        for(i = 0; i < cities.length; i++) {
            city = cities[i];

            var btn = new ccui.Button();
            btn.loadTextures(res.blue_png, res.blue_a_png, res.blue_d_png);
            btn.x = (i+1)*20 + (i*80);
            btn.y = scrollViewRect.height / 2;
            btn.anchorX = 0;
            btn.anchorY = 0.5;
            btn.titleText = city.name;
            btn.titleColor = cc.color(255, 255, 255, 255);
            btn.titleFontSize = 24;
            btn.setScale9Enabled(true);
            btn.width = 80;
            btn.height = 40;

            btn.addClickEventListener(function () {
                cc.log('--btn click--');
            });

            scrollView.addChild(btn);
            var scrollWidth = 100 * (i+1) + 20;
            if (scrollWidth < scrollView.width) {
                scrollWidth = scrollView.width;
            }
            scrollView.setInnerContainerSize(cc.size(scrollWidth, 80));
        }

        this.addChild(scrollView);

        this._txt_province.string = stateData.province;
    },

    init: function(items) {
        return;

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
//            menu.addChild(this._createItem(city.name, i, height/2));
            var btn = new ccui.Button(res.btn1_jpg, res.btn3_png, res.btn3_png);
            btn.x = this._sv_city_list.x;
            btn.y = this._sv_city_list.y;
            btn.attr({x: 0, y: 0});
            this.addChild(btn, 4);
        }
//        this._sv_city_list.addChild(menu);

        var abtn = new ccui.Button(res.black_png, res.black_png, res.gray_png);
        abtn.titleText = '你好';
        abtn.x = this._sv_city_list.x;
        abtn.y = this._sv_city_list.y;
        abtn.titleColor = cc.color(0, 0, 0);
        this._sv_city_list.addChild(abtn);
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