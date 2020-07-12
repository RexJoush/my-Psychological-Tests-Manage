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
});
// 获取所有的心理测试分类标签
router.get('/getConsultantList', (req, res) => {
    let url = "http://" + req.headers.host + "/webapp/discover/getCategoryList";
    res.redirect(301, url);
});

// 获取所有咨询师
router.get('/getConsultantList', (req, res) => {
    let url = "http://" + req.headers.host + "/webapp/discover/getConsultantList";
    res.redirect(301, url);
});

// 获取课程函数，区别一下线上课程和心理成长活动
function getCourse(is_course, res){
    let sql =
        "SELECT" +
            " course_id," + // 课程 id
            " title" +  // 课程名
        " FROM" +
            " course" +
        " WHERE" +
            " is_course = ?";
    mysql.connection.query(sql, [is_course], (err, result) => {
        utils.sendFunc(err, res, result);
    });
}

// 获取所有线上课程
router.get("/getCourseList", (req, res) => {
    getCourse(1, res);
});

// 获取所有心理成长活动
router.get("/getPsyGrowList",(req,res)=>{
    getCourse(0, res);
});

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
    let value = req.query.value;
    let sql =
        "SELECT" +
            " consultant_id," + // 咨询师 id
            " consultant_name," +  // 咨询师名字
            " img_url" +  // 咨询师照片
        " FROM" +
            " consultant" + // 咨询师表
        " WHERE " + category_name  + " = ?";
    mysql.connection.query(sql, [value], (err,result)=>{
        utils.sendFunc(err, res, result);
    });
});

/*
    与我的页面相关的添加函数
 */

function addUserData(openId, table, id, value, res) {
    let date = new Date().toLocaleDateString();
    let time = new Date().toLocaleTimeString();
    let sql = "INSERT INTO " + table + " (openId, " + id + ", date, time) VALUES (?,?,?,?)";
    mysql.connection.query(sql, [openId, value, date, time], (err, result) => {
        utils.returnFunc(err, res);
    });
}


// 开始心理测试
router.get("/addUserPsyTest", (req, res) => {
    let openId = req.query.open_id;
    let test_id = req.query.test_id;
    addUserData(openId, "user_psy_test", "test_id", test_id, res);
});

// 开始心理课程
router.get("/addUserCourse", (req, res) => {
    let openId = req.query.open_id;
    let course_id = req.query.course_id;
    addUserData(openId, "user_course", "course_id", course_id, res);
});

// 开始心理咨询
router.get("/addUserConsultant", (req, res) => {
    let openId = req.query.open_id;  // 用户 openId
    let consultant_id = req.query.consultant_id; // 当前咨询师 id
    let form = req.query.form;  // 选择的咨询形式
    let subscribe_time = req.query.subscribe_time; // 申请时间
    let times = req.query.times; // 申请的预约次数
    let price = req.query.price; // 花费价格
    let date = new Date().toLocaleDateString(); // 提交日期
    let time = new Date().toLocaleTimeString(); // 提交时间
    let sql = "INSERT INTO user_consultant (openId, consultant_id, form, subscribe_time, times, price, date, time) VALUES (?,?,?,?,?,?,?,?)";
    mysql.connection.query(sql, [openId, consultant_id, form, subscribe_time, times, price, date, time], (err, result) => {
        utils.returnFunc(err, res);
    })
});



// 开始心理成长
/*router.get("/addUserPsyGrow", (req, res) => {
    let openId = req.query.open_id;
    let consultant_id = req.query.consultant_id;
    addUserData(openId, "user_consultant", "consultant_id", consultant_id, res);
});*/

// 获取咨询师最近15天的时刻表
router.get("/getSchedule", (req, res) => {
    let consultant_id = req.query.consultant_id;
});
module.exports = router;