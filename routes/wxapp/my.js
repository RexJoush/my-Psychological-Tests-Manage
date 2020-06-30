/*
    小程序端我的页的 路由
 */
let express = require("express");
let router = express.Router();
let bodyParser = require("body-parser");
let request = require("request");
let WXBizDataCrypt = require('../../util/WXBizDataCrypt');

let mysql = require("../../util/mysql");


// 获取用户openid数据
let appId = "wxf5518fc768f007a8";
let SECRET = "56d26bb6424881262fa915ced89f7c11";

// 设置处理post的中间件
router.use(bodyParser.urlencoded({extended: false}));


// 获取用户的 openid
router.post('/getOpenid', (req, res) => {
    // console.log(req.body);
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
                            " psy_user" + // psy_user 表
                            " (openId," + // 用户 openId
                            "nickName," + // 用户微信名
                            "avatarUrl," + // 用户头像
                            "gender," + // 用户性别
                            "city," + // 用户城市
                            "province," + // 用户省份
                            "country," +  // 用户国家
                            "times)" + // 添加时间
                            " values (?,?,?,?,?,?,?,?)";

                        // 插入用户数据
                        mysql.connection.query(sql,
                            [data.openId, data.nickName, data.avatarUrl, data.gender, data.city, data.province, data.country, new Date().toLocaleString()],
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


router.get("/get");


module.exports = router;