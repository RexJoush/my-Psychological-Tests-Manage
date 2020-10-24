let express = require("express");
let router = express.Router();
let multipart = require('connect-multiparty');
let multipartMiddleware = multipart();
let fs = require("fs");
let mysql = require("../../util/mysql");
let uuid = require("uuid");
let utils = require("../../util/utils");

// 获取轮播图
router.get("/getSwiper", (req, res) => {
    let sql =
        "SELECT" +
            " banner_id," + // 图片id
            " img_url " +  // 图片地址
        " FROM" +
            " banner";
    mysql.connection.query(sql, [], (err, result) => {
        utils.sendFunc(err, res, result);
    });
})

// 删除轮播图
router.get("/delSwiper", (req, res) => {
    let banner_id = req.query.banner_id;
    console.log(banner_id);
    try {
        fs.unlinkSync("../../public/wxapp/image/banner/" + banner_id + ".jpg");
    } catch (e){
        res.status(200)
            .send({result: 0, err: "删除失败"});
	    throw e;
    }

    let sql = "DELETE FROM banner WHERE banner_id = ?";

    mysql.connection.query(sql, [banner_id], (err, result) => {
        utils.returnFunc(err, res);
    });
})

// 上传轮播图
router.post("/changeSwiper", multipartMiddleware, (req, res) => {

    // 获取文件对象
    let img = req.files.img_url; // 轮播图
    let banner_id = uuid.v4();

    let name = banner_id + ".jpg";
    let path = img.path;
    try {
        // 获取上传的临时图片对象
        let fd = fs.readFileSync(path);

        // 将图片写入轮播图的位置
        fs.writeFileSync("./public/wxapp/image/banner/" + name, fd);
        // 将临时图片删除
        fs.unlinkSync(path);
    } catch (e) {
        res.status(200)
            .send({result: 0, err: "修改失败"});
        throw e;
    }

    // 更新数据库
    let sql =   "INSERT INTO banner (banner_id,img_url) values(?,?)";
    // 拼接图片地址
    let img_url = utils.host + "/wxapp/image/banner/" + name;
    mysql.connection.query(sql,[banner_id,img_url],(err,result)=>{
        utils.returnFunc(err, res);
    });
})

// 获取首页显示的心理测试
router.get("/getHomePsyTest", (req, res) => {
    let sql =
        "SELECT" +
            " test_id," +  // 测试id
            " name," +     // 测试名字
            " introduction" +  // 测试简介
        " FROM" +
            " psy_test" +  // 心理测试表
        " WHERE" +
            " is_in_home = 1"; // 查询在首页的信息

    mysql.connection.query(sql, [], (err, result) => {
        utils.sendFunc(err, res, result);
    });
})


// 获取首页显示的咨询师
router.get("/getHomeConsultant", (req, res) => {
    let sql =
        "SELECT" +
            " consultant_id," +  // 咨询师id
            " consultant_name," +     // 咨询师名字
            " img_url" +  // 咨询师图片地址
        " FROM" +
            " consultant" + // 咨询师表
        " WHERE" +
            " is_in_home = 1"; // 查询在首页的信息

    mysql.connection.query(sql, [], (err, result) => {
        utils.sendFunc(err, res, result);
    });
})

// 获取首页显示的课程
router.get("/getHomeCourse", (req, res) => {
    let sql =
        "SELECT" +
            " course_id," +  // 课程id
            " title" +  // 课程标题
        " FROM" +
            " course" + // 课程表
        " WHERE" +
            " is_in_home = 1"; // 查询在首页的信息

    mysql.connection.query(sql, [], (err, result) => {
        utils.sendFunc(err, res, result);
    });
})


// 首页添加和删除函数
function changeHome(table, id, value, style, callback) {
    /*
        style = 1,添加
        style = 0,删除
     */
    let sql =
        "UPDATE " +
            table +  // 咨询师表
        " SET" +
            " is_in_home = " + style + // 设置值
        " WHERE" +
            " "+ id +" = ?"; // 设置当前咨询师
    mysql.connection.query(sql, [value], (err, result) => {
        if (err) {
            callback(true);
        } else {
            callback(false);
        }
    });
}


// 添加首页显示的心理测试
router.get("/addHomePsyTest", (req, res) => {
    let test_id = req.query.test_id;
    changeHome("psy_test", "test_id", test_id, 1, (err) => {
        utils.returnFunc(err, res);
    });
})

// 添加首页显示的咨询师
router.get("/addHomeConsultant", (req, res) => {
    let consultant_id = req.query.consultant_id;
    changeHome("consultant", "consultant_id", consultant_id, 1, (err) => {
        utils.returnFunc(err, res);
    });
})

// 添加首页显示的课程
router.get("/addHomeCourse", (req, res) => {
    let course_id = req.query.course_id;
    changeHome("course", "course_id", course_id, 1, (err) => {
        utils.returnFunc(err,res);
    });
})

// 删除首页显示的心理测试
router.get("/delHomePsyTest", (req, res) => {
    let test_id = req.query.test_id;
    changeHome("psy_test", "test_id", test_id, 0, (err) => {
        utils.returnFunc(err, res);
    });
})

// 删除首页显示的咨询师
router.get("/delHomeConsultant", (req, res) => {
    let consultant_id = req.query.consultant_id;
    changeHome("consultant", "consultant_id", consultant_id, 0, (err) => {
        utils.returnFunc(err, res);
    });
})

// 删除首页显示的课程
router.get("/delHomeCourse", (req, res) => {
    let course_id = req.query.course_id;
    changeHome("course", "course_id", course_id, 0, (err) => {
        utils.returnFunc(err,res);
    });
})


// 修改EAP
router.post("/changeEap", multipartMiddleware, (req, res) => {

    let eap_id = 1; // eap_id
    let title = req.body.title; // 咨询师简介
    let subtitle = req.body.subtitle; // 咨询师擅长领域

    // 获取文件对象
    let img_url = req.files.img_url; // 咨询师照片图片
    let details_img_url = req.files.details_img_url; // 咨询师详情页照片

    // 拼接文件名
    let img_urlName = eap_id + ".jpg";
    let details_img_urlName = eap_id + ".jpg";

    // 获取文件临时路径
    let path1 = img_url.path;
    let path2 = details_img_url.path;
    try {
        // 获取上传的临时图片对象
        let fd1 = fs.readFileSync(path1); // eap简介
        let fd2 = fs.readFileSync(path2); // eap详细介绍图片

        // 将图片写入咨询师的位置
        fs.writeFileSync("./public/wxapp/image/eap/" + img_urlName, fd1);
        fs.writeFileSync("./public/wxapp/image/eap_details/" + details_img_urlName, fd2);

        // 将临时图片删除
        fs.unlinkSync(path1);
        fs.unlinkSync(path2);
    } catch (e) {
        res.send({result: 0, err: "图片上传失败"});
        throw e;
    }

    let sql =
        "UPDATE" +
            " eap" +
        " SET " +
            "title = ?," +   // 修改咨询师介绍
            "subtitle = ?" + // 修改咨询师擅长领域
        " WHERE" +
            " eap_id = ?";
    // 更新数据库
    mysql.connection.query(sql, [title, subtitle, eap_id], (err, result) => {
        utils.sendFunc(err, res, result);
    });
})

module.exports = router;
