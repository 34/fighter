var AppFacade = require('./appFacade.js');
var g_resouces = require('./resource.js').g_resouces;
var data = require('./model/data.js');

(function() {
    cc.game.onStart = function(){
        cc.log(data);
        cc.view.adjustViewPort(true);
        cc.view.setDesignResolutionSize(640, 1136, cc.ResolutionPolicy.SHOW_ALL);
        cc.view.resizeWithBrowserSize(true);

        ccs.csLoader.setRecordProtocolBuffersPath(true);
        cc.LoaderScene.preload(g_resouces, function() {
            var key = 'fighter-mvc';
            AppFacade.getInstance(key).startup();
        }, this);
    };
    cc.game.run();
})();