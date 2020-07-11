/*
    小程序端发现页的 路由
 */
let express = require("express");
let router = express.Router();

// 获取数据库对象
let mysql = require("../../util/mysql");
let utils = require("../../util/utils");

// 获取所有的心理测试
router.get('/getPsyTestList', (req, res) => {
    let url = "http://" + req.headers.host + "/webapp/discover/getPsyTestList";
    res.redirect(301, url);
})
// 获取所有咨询师
router.get('/getConsultantList', (req, res) => {
    let url = "http://" + req.headers.host + "/webapp/discover/getConsultantList";
    res.redirect(301, url);
})
// 获取所有线上课程
router.get('/getCourseList', (req, res) => {
    let url = "http://" + req.headers.host + "/webapp/discover/getCourseList";
    res.redirect(301, url);
})

// 按标签查询心理测试
router.get("/getPsyTestByCategory", (req, res) => {
    let category_id = req.query.category_id;
    let sql =
        "SELECT" +
            " test_id," + // 测试 id
            " name," +  // 测试名字
            " introduction" +  // 测试简介
        " FROM" +
            " psy_test" +
        " WHERE" +
            " category_id = ?";
    mysql.connection.query(sql, [category_id], (err, result) => {
        utils.sendFunc(err, res, result);
    });
});


// 心理咨询师排序分类
router.get("/getConsultantByCategory", (req, res) => {
    let category_name = req.query.category_name;
    let sql =
        "SELECT" +
            " test_id," + // 测试 id
            " name," +  // 测试名字
            " introduction" +  // 测试简介
        " FROM" +
            " psy_test" +
        " WHERE" +
            " category_id = ?";
});


module.exports = router;