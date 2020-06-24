
/*
    小程序端首页的 路由
 */
let express = require("express");
let router = express.Router();

// 获取数据库对象
let mysql = require("../../util/mysql");

// 获取轮播图
router.get("/getBannerData",(req,res)=>{
    let arr = [];
    for (let i = 1; i < 7; i++){
        let obj = {};
        let imgUrl = "http://www.rexjoush.com:3000/wxapp/image/banner/"+ i +".jpg";
        obj.value = i;
        obj.label = imgUrl;
        arr.push(obj);
    }
    res.send(arr);
});

// 获取心理测评

// 获取心理咨询
router.get("/getPsychologicalCounseling",(req,res)=>{
    let arr = [];
    let obj = {};

});

module.exports = router;