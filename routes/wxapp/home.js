/*
    小程序端首页的 路由
 */
let express = require("express");
let router = express.Router();

// 获取数据库对象
let mysql = require("../../util/mysql");

// 获取轮播图
router.get("/getBannerData", (req, res) => {
    let arr = [];
    for (let i = 1; i < 7; i++) {
        let obj = {};
        let imgUrl = "http://www.rexjoush.com:3000/wxapp/image/banner/" + i + ".jpg";
        obj.value = i;
        obj.label = imgUrl;
        arr.push(obj);
    }
    res.send(arr);
});

// 获取心理测评
router.get("/getPsyTestData", (req, res) => {
    let arr = [];
    let obj = {};
    let sql =   "SELECT" +
                    " name," +  // 测试名字
                    " brief_introduction" + // 测试简介
                " FROM psy_test";

    mysql.connection.query(sql, [], (err, result) => {
        if (err) throw err;
        else {
            for (let i = 0; i < result.length; i++) {
                obj.name = result[i].name;
                obj.desc = result[i].brief_introduction;
                // 查询结果封装数组
                arr.push(obj);
                // 对象置空
                obj = {};
            }
            res.send(JSON.stringify(arr));
        }
    });

});

// 获取心里测评详情信息
router.get("/getPsyTestDetails", (req, res) => {
    let test_id = req.query.test_id;
    let sql =   "SELECT" +
                    " detail_img_url" +  // 详情图片地址
                " FROM" +
                    " psy_test" +
                " WHERE" +
                    " test_id = ?";
    mysql.connection.query(sql, [test_id], (err, result) => {
        if (err) throw err;
        else {
            let obj = {};
            obj.test_id = test_id;
            obj.detail_img_url = result[0].detail_img_url;
            res.send(obj);
        }
    });

})


// 获取心理咨询
router.get("/getPsychologicalCounseling", (req, res) => {
    let arr = [];
    let obj = {};
    let sql =   "SELECT" +
                    " image_url," +  // 咨询师照片
                    " expertise_field," + // 擅长领域
                    " descr," +  // 介绍
                    " cost," + // 价格
                    " consult_style" +  // 咨询方式
                " FROM counseling";
    mysql.connection.query(sql, [], (err, result) => {
        if (err) throw err;
        else {
            for (let i = 0; i < result.length; i++) {
                obj.imgurl = result[i].image_url;
                obj.expert = result[i].expertise_field;
                obj.desc = result[i].descr;
                obj.price = result[i].cost;
                obj.form = result[i].consult_style;

                // 查询结果封装数组
                arr.push(obj);
                // 对象置空
                obj = {};
            }
            res.send(JSON.stringify(arr));
        }
    });
});

// 获取心里测评详情信息
router.get("/getCounselingDetails", (req, res) => {
    let consultant_id = req.query.consultant_id;
    let sql =   "SELECT" +
                    " consultant_id," +  // 咨询师 id
                    " image_url," +  // 咨询师照片
                    " descr," +  // 咨询师简介
                    " expertise_field," +  // 咨询师擅长领域
                    " cost," +  // 咨询费用
                    " consult_style," +  // 咨询形式
                    " counseling_detail_img_url" +   // 咨询形
                " FROM" +
                    " psy_test" +
                " WHERE" +
                    " consultant_id = ?";
    mysql.connection.query(sql, [consultant_id], (err, result) => {
        if (err) throw err;
        else {
            let obj = {};
            obj.consultant_id = consultant_id;
            obj.detail_img_url = result[0].detail_img_url;
            res.send(obj);
        }
    });

})


// 获取线上课程
router.get("/getCourseData", (req, res) => {
    let arr = [];
    let obj = {};
    let sql =   "SELECT" +
                    " brief_introduction," +  // 咨询师照片
                    " course_imgurl," + // 擅长领域
                    " title," +  // 评价
                    " subtitle" + // 价格
                " FROM course";
    mysql.connection.query(sql, [], (err, result) => {
        if (err) throw err;
        else {
            for (let i = 0; i < result.length; i++) {
                obj.intro = result[i].brief_introduction;
                obj.imgurl = result[i].course_imgurl;
                obj.title = result[i].title;
                obj.subtitle = result[i].subtitle;

                // 查询结果封装数组
                arr.push(obj);
                // 对象置空
                obj = {};
            }
            res.send(JSON.stringify(arr));
        }
    });
});

// 获取EAP简介
router.get("/getEap", (req, res) => {
    let arr = [];
    let obj = {};
    let sql =   "SELECT" +
                    " intro," +  // EAP简介
                    " imgurl," + // 图片
                    " title," +  // 标题
                    " subtitle" + // 副标题
                " FROM eap";
    mysql.connection.query(sql, [], (err, result) => {
        if (err) throw err;
        else {
            for (let i = 0; i < result.length; i++) {
                obj.intro = result[i].intro;
                obj.imgurl = result[i].imgurl;
                obj.title = result[i].title;
                obj.subtitle = result[i].subtitle;
            }
            arr.push(obj);
            res.send(JSON.stringify(arr));
            // 对象置空
            obj = {};
        }
    });

});

module.exports = router;