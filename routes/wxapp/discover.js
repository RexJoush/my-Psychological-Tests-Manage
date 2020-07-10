/*
    小程序端发现页的 路由
 */
let express = require("express");
let router = express.Router();
let request = require("request");

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

module.exports = router;