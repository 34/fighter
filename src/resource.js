var res = {
    add_jpg: "res/images/add.jpg",
    btn1_jpg: "res/images/btn1.jpg",

    btn3_png: "res/images/btn3.jpg",
    btn5_png: "res/images/btn5.jpg",
    btn7_jpg: "res/images/btn7.jpg",

    img1_png: "res/images/img1.jpg",
    img5_jpg: "res/images/img5.jpg",
    img6_jpg: "res/images/img6.jpg",
    txt_bg1_jpg: "res/images/txt_bg1.jpg",
    black_png: "res/images/brack.png",
    gray_png: "res/images/gray.png",
    blue_png: "res/images/blue.png",
    blue_a_png: "res/images/blue_a.png",
    blue_d_png: "res/images/blue_d.png",
    love_lv_bg_png: "res/images/love_lv_bg.png",


    MainNode: "res/MainScene.csb",
    TaskNode: "res/TaskNode.csb",
    TrainNode: "res/TrainNode.csb",
    LoveLayer: "res/LoveLayer.csb",
    LoveItem: "res/LoveItem.csb",
    LoveConfirmNode: "res/LoveConfirmNode.csb",
    ConfirmNode: "res/ConfirmNode.csb",
    FightNode: "res/FightNode.csb",
    HomeNode: "res/HomeNode.csb",
    titleNode: "res/titleNode.csb"
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}

module.exports.res = res;
module.exports.g_resouces = g_resources;