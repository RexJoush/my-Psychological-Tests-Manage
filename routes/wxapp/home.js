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
                    " test_id," + //  测试id
                    " name," +  // 测试名字
                    " introduction" + // 测试简介
                " FROM psy_test";

    mysql.connection.query(sql, [], (err, result) => {
        if (err) throw err;
        else {
            for (let i = 0; i < result.length; i++) {
                obj.test_id = result[i].test_id;
                obj.name = result[i].name;
                obj.introduction = result[i].introduction;
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
                    " details_img_url" +  // 详情图片地址
                " FROM" +
                    " psy_test" +
                " WHERE" +
                    " test_id = ?";
    mysql.connection.query(sql, [test_id], (err, result) => {
        if (err) throw err;
        else {
            let obj = {};
            obj.test_id = test_id;
            obj.details_img_url = result[0].details_img_url;
            res.send(JSON.stringify(obj));
        }
    });
});


// 获取心理咨询
router.get("/getPsyCounseling", (req, res) => {
    let arr = [];
    let obj = {};
    let sql =   "SELECT" +
                    " consultant_id," + // 咨询师 id
                    " img_url," +  // 咨询师照片
                    " expertise," + // 擅长领域
                    " introduction," +  // 介绍
                    " price," + // 价格
                    " form" +  // 咨询方式
                " FROM consultant";
    mysql.connection.query(sql, [], (err, result) => {
        if (err) throw err;
        else {
            for (let i = 0; i < result.length; i++) {
                obj.consultant_id = result[0].consultant_id;
                obj.img_url = result[i].img_url;
                obj.expertise = result[i].expertise;
                obj.introduction = result[i].introduction;
                obj.price = result[i].price;
                obj.form = result[i].form;

                // 查询结果封装数组
                arr.push(obj);
                // 对象置空
                obj = {};
            }
            res.send(JSON.stringify(arr));
        }
    });
});

// 获取心理咨询师详情信息
router.get("/getConsultantDetails", (req, res) => {
    let consultant_id = req.query.consultant_id;
    let sql =   "SELECT" +
                    " consultant_id," +  // 咨询师 id
                    " img_url," +       // 咨询师照片
                    " introduction," +  // 咨询师简介
                    " expertise," +     // 咨询师擅长领域
                    " price," +          // 咨询费用
                    " form," +           // 咨询形式
                    " details_img_url" + // 咨询师其他内容详情
                " FROM" +
                    " consultant" +
                " WHERE" +
                    " consultant_id = ?";
    mysql.connection.query(sql, [consultant_id], (err, result) => {
        if (err) throw err;
        else {
            let obj = {};
            obj.consultant_id = consultant_id;
            obj.img_url = result[0].img_url;
            obj.expertise = result[0].expertise;
            obj.introduction = result[0].introduction;
            obj.price = result[0].price;
            obj.form = result[0].form;
            obj.details_img_url = result[0].details_img_url;

            res.send(JSON.stringify(obj));
        }
    });

})


// 获取线上课程
router.get("/getCourseData", (req, res) => {
    let arr = [];
    let obj = {};
    let sql =   "SELECT" +
                    " course_id," +  // 课程id
                    " img_url," + // 课程图片
                    " title," +   // 课程标题
                    " subtitle" + // 课程副标题
                " FROM course";
    mysql.connection.query(sql, [], (err, result) => {
        if (err) throw err;
        else {
            for (let i = 0; i < result.length; i++) {

                obj.course_id = result[i].course_id;
                obj.img_url = result[i].img_url;
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
    let sql =   "SELECT" +
                    " img_url," + // 图片
                    " title," +  // 标题
                    " subtitle" + // 副标题
                " FROM eap WHERE eap_id = 1";
    mysql.connection.query(sql, [], (err, result) => {
        if (err) throw err;
        else {
            let obj = {};
            obj.img_url = result[0].img_url;
            obj.title = result[0].title;
            obj.subtitle = result[0].subtitle;
            arr.push(obj);
            res.send(JSON.stringify(arr));
        }
    });

});

// 获取心里eap详情信息
router.get("/getEapDetails", (req, res) => {
    let sql =   "SELECT" +
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