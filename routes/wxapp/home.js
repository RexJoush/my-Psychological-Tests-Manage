/*
    小程序端首页的 路由
 */
let express = require("express");
let router = express.Router();

// 获取数据库对象
let mysql = require("../../util/mysql");
let utils = require("../../util/utils");



// 获取轮播图
router.get("/getBannerData", (req, res) => {

    let sql =
        "SELECT" +
            " banner_id," + // 图片id
            " img_url " +  // 图片地址
        " FROM" +          // 修改测试名称
            " banner"; +   // 修改测试简介

    mysql.connection.query(sql, [], (err, result) => {
        utils.sendFunc(err, res, result);
    })
});

// 获取心理测评
router.get("/getPsyTestData", (req, res) => {
    let sql =
        "SELECT" +
            " test_id," + //  测试id
            " name," +  // 测试名字
            " introduction" + // 测试简介
        " FROM" +
            " psy_test" + // 心理测试表
        " WHERE" +
            " is_in_home = 1"; // 查询在首页的

    mysql.connection.query(sql, [], (err, result) => {
        utils.sendFunc(err, res, result);
    });

});

// 获取心里测评详情信息
router.get("/getPsyTestDetails", (req, res) => {
    let test_id = req.query.test_id;
    let sql =
        "SELECT" +
            " test_id," +
            " details_img_url" +  // 详情图片地址
        " FROM" +
            " psy_test" +
        " WHERE" +
            " test_id = ?";
    mysql.connection.query(sql, [test_id], (err, result) => {
        utils.sendFunc(err, res, result);
    });
});


// 获取心理咨询师
router.get("/getPsyCounseling", (req, res) => {
    let sql =
        "SELECT" +
            " consultant_id," + // 咨询师 id
            " img_url," +  // 咨询师照片
            " expertise," + // 擅长领域
            " introduction," +  // 介绍
            " price," + // 价格
            " form" +  // 咨询方式
        " FROM" +
            " consultant" +
        " WHERE" +
            " is_in_home = 1";
    mysql.connection.query(sql, [], (err, result) => {
        utils.sendFunc(err, res, result);
    });
});

// 获取心理咨询师详情信息
router.get("/getConsultantDetails", (req, res) => {
    let consultant_id = req.query.consultant_id;
    let sql =
        "SELECT" +
            " consultant_id," + // 咨询师id
            " img_url," +       // 咨询师照片
            " introduction," +  // 咨询师简介
            " expertise," +     // 咨询师擅长领域
            " price," +          // 咨询费用
            " form," +           // 咨询形式
            " details_img_url" + // 咨询师其他内容详情
        " FROM" +
            " consultant" +  // 咨询师表
        " WHERE" +
            " consultant_id = ?";  // 筛选在首页的信息
    mysql.connection.query(sql, [consultant_id], (err, result) => {
        utils.sendFunc(err, res, result);
    });

})


// 获取线上课程
router.get("/getCourseData", (req, res) => {
    let sql =
        "SELECT" +
            " course_id," +  // 课程id
            " img_url," + // 课程图片
            " title," +   // 课程标题
            " subtitle" + // 课程副标题
        " FROM" +
            " course" +  // 课程表
        " WHERE" +
            " is_in_home = 1"; // 筛选首页的信息
    mysql.connection.query(sql, [], (err, result) => {
        utils.sendFunc(err, res, result);
    });
});





// 获取EAP简介
router.get("/getEap", (req, res) => {
    let sql =
        "SELECT" +
            " img_url," + // 图片
            " title," +  // 标题
            " subtitle" + // 副标题
        " FROM" +
            " eap" + // eap表
        " WHERE" +
            " eap_id = 1";
    mysql.connection.query(sql, [], (err, result) => {
        utils.sendFunc(err, res, result);
    });

});

// 获取心里eap详情信息
router.get("/getEapDetails", (req, res) => {
    let sql =
        "SELECT" +
            " details_img_url" +  // 详情图片地址
        " FROM eap";
    mysql.connection.query(sql, [], (err, result) => {
        if (err) throw err;
        else {
            // let obj = {};
            // obj.detail_img_url = result[0].detail_img_url;
            res.send(result[0].details_img_url);
        }
    });
});

module.exports = router;
