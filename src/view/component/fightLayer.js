/**
 * Created by Arthur on 2015/1/10.
 */
var res = require('../../resource.js').res;
var configData = require('../../model/data.js');

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
        var stateData = configData[1];

        var city, i, cities = stateData.cities;
        for(i = 0; i < cities.length; i++) {
            city = cities[i];

            var btn = new ccui.Button();
            btn.loadTextures(res.blue_png, res.blue_a_png, res.blue_d_png);
            btn.x = (i+1)*20 + (i*80);
            btn.y = scrollViewRect.height / 2;
            btn.anchorX = 0;
            btn.anchorY = 0.5;
            btn.titleText = city.city;
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