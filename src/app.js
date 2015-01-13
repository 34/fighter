var AppFacade = require('./appFacade.js');
var g_resouces = require('./resource.js').g_resouces;

(function() {
    cc.game.onStart = function(){
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