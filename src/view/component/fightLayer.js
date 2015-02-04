/**
 * Created by Arthur on 2015/1/10.
 */
var res = require('../../resource.js').res;
var configData = require('../../model/data.js');
var Battle = require('../../battle/battle.js');

module.exports = cc.Layer.extend({
    ctor: function() {
        this._super();

        var rootNode = this._rootNode = new cc.LayerColor(cc.color(51, 51, 51, 255));
        this.addChild(rootNode);
    },

    init: function(player) {
        this._player = player;

        this.addTitle();
        this.loadCities();
        this.initConsole();
        return true;
    },

    initConsole: function() {
        var console_bg = new ccui.ImageView();
        console_bg.loadTexture(res.gray_png);
        console_bg.setScale9Enabled(true);
        var width = 580;
        var height = 700 + (cc.winSize.height - 1136);
        console_bg.attr({
            width: width,
            height: height,
            x: cc.winSize.width/2,
            y: cc.winSize.height - 210,
            anchorX: 0.5,
            anchorY: 1
        });
        this.addChild(console_bg);
        var console = this._console = new ccui.ScrollView();
        console.setDirection(ccui.ScrollView.DIR_VERTICAL);
        console.setTouchEnabled(true);
        console.setContentSize(cc.size(width, height));
        console.setInertiaScrollEnabled(true);
        console_bg.addChild(console);
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

    loadCities: function() {
        var scrollView = this._cities = new ccui.ScrollView();
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
        var stateData = configData[this._player.get('province')];
        var city_index = this._player.get('city');

        var city, i, scrollToX, cities = stateData.cities;
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

            btn.addClickEventListener(this._onClickCityListener.bind(this, city, i));

            scrollView.addChild(btn);
            var scrollWidth = 100 * (i+1) + 20;
            if (scrollWidth < scrollView.width) {
                scrollWidth = scrollView.width;
            }
            scrollView.setInnerContainerSize(cc.size(scrollWidth, 80));

            if (i == city_index) {
                scrollToX = btn.x;
            }

            if (i > city_index) {
                btn.setEnabled(false);
                btn.setBright(false);
            }

        }

        var percent = scrollToX/scrollView.innerWidth*100;
        scrollView.scrollToPercentHorizontal(percent, 0.1, true);
        this.addChild(scrollView);
        this._txt_province.string = stateData.province;
    },

    _onClickCityListener: function(city, index) {
        cc.log('click city: ', city);

        this._console.removeAllChildren();

        var battle = new Battle({
            player: this._player.toJson(),
            ememy: city
        });
        var report = battle.execute();
        this._updateConsole(report, index);
        this.onFight(report, index);
    },

    _updateConsole: function(report, index) {
        var self = this;
        this.schedule(function() {
            var strs = report.show();
            if (!strs) return;
            
            strs.forEach(function(str) {
                var line = new cc.LabelTTF(str, null, 24);
                line.color = cc.color(0, 0, 0);
                line.anchorX = 0;
                line.anchorY = 0.5;

                var childCount = self._console.childrenCount;
                line.x = 20;
                line.y = self._console.height - 20 - childCount * 35;
                self._console.addChild(line);

                if (childCount+1 == report.length() && index+1 == self._player.get('city') && report.isWin()) {
                    self.onBattleEnd(index);
                }
            });

        }, 1, cc.REPEAT_FOREVER);
    },

    _updateProvince: function(name) {
        this._txt_province.string = name;
    },

    onBackListener: function() {
        if (this.onBack) {
            this.onBack();
        }
    },

    onBattleEnd: function(index) {
        this.unscheduleAllCallbacks();

//        var city = this._cities.children[index];
//        city.setEnabled(false);
//        city.setBright(false);

        var cur_city = this._cities.children[index+1];
        cur_city.setEnabled(true);
        cur_city.setBright(true);
    },

    onExit: function() {
        this.unscheduleAllCallbacks();
    }
});