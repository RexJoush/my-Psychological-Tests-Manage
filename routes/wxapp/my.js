/*
    小程序端我的页的 路由
 */
let express = require("express");
let router = express.Router();
let bodyParser = require("body-parser");
let request = require("request");
let WXBizDataCrypt = require('../../util/WXBizDataCrypt');

let mysql = require("../../util/mysql");
let utils = require("../../util/utils");


// 获取用户openid数据
let appId = "wxf5518fc768f007a8";
let SECRET = "56d26bb6424881262fa915ced89f7c11";

// 设置处理post的中间件
router.use(bodyParser.urlencoded({extended: false}));


// 获取用户的 openid
router.post('/getOpenId', (req, res) => {
    let iv = req.body.iv;
    let encryptedData = req.body.encryptedData;
    let code = req.body.code;

    request({
        url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' +
            appId +
            '&secret=' +
            SECRET +
            '&js_code=' +
            code +
            '&grant_type=authorization_code',
        method: "POST",
        json: true,
        headers: {
            "content-type": "application/json",
        },
    }, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            // 解密获取数据
            let pc = new WXBizDataCrypt(appId, body.session_key);
            let data = pc.decryptData(encryptedData, iv);

            // 先查重
            mysql.connection.query("select * from psy_user where openId = ?", [data.openId], (err, result) => {
                if (err) throw err;
                else {
                    // 用户存在，则不用插入
                    if (result.length > 0) {
                        res.end(data.openId);
                    } else {
                        let sql =
                            "INSERT INTO" +
                                " wxapp_user" + // wxapp_user 表,存储访问用户
                            " (openId, nickName, avatarUrl, gender, city, province, country, date, time)" + // 添加时间
                            " VALUES (?,?,?,?,?,?,?,?,?)";

                        // 插入用户数据
                        mysql.connection.query(sql,
                            [data.openId, data.nickName, data.avatarUrl, data.gender, data.city, data.province, data.country, new Date().toLocaleDateString(), new Date().toLocaleTimeString()],
                            (err, result) => {
                                if (err) throw err;
                                else {
                                    res.end(data.openId);
                                }
                            });
                    }
                }
            })
        }
    });
});

// 获取用户做过的心理测试
router.get("/getUserPsyTest",(req,res)=>{
    let openId = req.query.openId;
    let sql =
        "SELECT" +
            " p.test_id," +   // 测试的 id
            " name," +       // 测试的名字
            " introduction," +  // 测试简介
            " date," +     // 测试的日期
            " time" +       // 测试的时间
        " FROM" +
            " psy_test p,user_psy_test u" +  // 咨询师表
        " WHERE" +
            " p.test_id = u.test_id" + // 连接条件
        " AND" +
            " openId = ?";  // 筛选该用户的测试
    mysql.connection.query(sql, [openId], (err, result) => {
        utils.sendFunc(err, res, result);
    });
})

// 获取用户做过的心理咨询
router.get("/getUserConsultant", (req, res) => {
    let openId = req.query.openId;
    let sql =
        "SELECT" +
            " c.consultant_id," + // 咨询师id
            " c.consultant_name," +  // 咨询师姓名
            " u.form," +          // 咨询形式
            " u.price," +           // 咨询总价格
            " u.subscribe_time," +  // 咨询预约时间
            " u.times," +           // 预约次数
            " u.date," +           // 咨询申请日期
            " u.time" +           // 咨询申请时间
        " FROM" +
            " consultant as c,user_consultant as u" +  // 咨询师表和用户咨询师表
        " WHERE" +
            " c.consultant_id = u.consultant_id" + // 连接条件
        " AND" +
            " openId = ?";  // 筛选在首页的信息

    // 执行查询并返回
    mysql.connection.query(sql, [openId], (err, result) => {
        utils.sendFunc(err, res, result);
    });
})


// 获取用户的线上课程或者是心理成长
function getUserCourse(openId, is_course, res){
    let sql =
        "SELECT" +
            " c.course_id," + // 课程id
            " c.title," +  // 课程名
            " u.price," +  // 课程价格
            " u.date," +   // 课程申请日期
            " u.time" +    // 课程申请时间
        " FROM" +
            " course as c,user_course as u" +  // 咨询师表和用户咨询师表
        " WHERE" +
                " c.course_id = u.course_id" + // 连接条件
            " AND" +
                " openId = ?" +  // 筛选在首页的信息
            " AND" +
                " c.is_course = ?";  // 筛选在首页的信息
    // 执行查询并返回
    mysql.connection.query(sql, [openId, is_course], (err, result) => {
        utils.sendFunc(err, res, result);
    });
}
router.get("/getUserCourse", (req, res) => {
    let openId = req.query.openId;

    getUserCourse(openId, 1, res);

    /*let sql =
        "SELECT" +
            " c.course_id," + // 咨询师id
            " c.name," +  // 咨询师姓名
            " u.price," +           // 咨询总价格
            " u.date," +           // 咨询申请日期
            " u.time" +           // 咨询申请时间
        " FROM" +
            " course as c,user_course as u" +  // 咨询师表和用户咨询师表
        " WHERE" +
            " c.course_id = u.course_id" + // 连接条件
        " AND" +
            " openId = ?";  // 筛选在首页的信息

    // 执行查询并返回
    mysql.connection.query(sql, [openId], (err, result) => {
        utils.sendFunc(err, res, result);
    });*/
})

// 获取用户做过的心理成长
router.get("/getUserGrow", (req, res) => {
    let openId = req.query.openId;
    getUserCourse(openId, 0, res);
})

module.exports = router;