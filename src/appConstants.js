/**
 * Created by Arthur on 2014/12/20.
 */
var constants = module.exports = {
    APP_NAME: "fighter",

    CUSTOM_NOTICICATION: 'custom_notification',
    CONFIRM_DIALOG: 'confirm_dialog',

    NOTIFICATION: {
        STARTUP: 'startup',
        SCENE_CHANGED: 'scene_changed',
        SCENE_HOME: 'scene_home'
    },

    SCENE_ACTION: 'scene_action',
    SCENE_ACTION_ADD_CHILD: 'scene_action_add_child',
    SCENE: {
        HOME: 'HomeMediator',
        TRAIN: 'TrainMediator',
        LOVE: "LoveMediator",
        FIGHT: "FightMediator"
    },

    TASK_STATUS : {
        STOP: 1,
        START: 2,
        FINISH: 3
    },

    PLAYER_ACTION: 'player_action',

    TASK_ACTION: 'task_action',
    TASK_ACTION_MONITOR: 'task_action_monitor',
    TASK_ACTION_START: 'task_action_start',
    TASK_ACTION_STOP: 'task_action_stop',
    TASK_ACTION_FINISHED: 'task_action_finished',

    LOVE_ACTION: 'love_action',
    FIGHT_ACTION: 'fight_action'
};