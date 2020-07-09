let express = require("express");
let router = express.Router();
let multipart = require('connect-multiparty');
let multipartMiddleware = multipart();
let fs = require("fs");
let mysql = require("../../util/mysql");
let uuid = require("uuid");
let host = require("../../util/utils");

// 获取轮播图
router.get("/getSwiper", (req, res) => {
    let response = {
        data: []
    }

    let sql =   "SELECT" +
                    " banner_id," + // 图片id
                    " img_url " +  // 图片地址
                " FROM" +          // 修改测试名称
                    " banner";   // 修改测试简介

    mysql.connection.query(sql, [], (err, result) => {
        let obj = {};
        for (let i = 0; i< result.length; i++){
            obj.fileid = result[i].banner_id;
            obj.banner_url = result[i].img_url;
            response.data.push(obj);
            // 置空
            obj = {};
        }
        res.status(200)
            .send(JSON.stringify(response));
    });
});


// 删除轮播图
router.get("/delSwiper", (req, res) => {
    let banner_id = req.query.fileid;
    console.log(banner_id);
    try {
        fs.unlinkSync("./public/wxapp/image/banner/" + banner_id + ".jpg");
    } catch (e){
        res.status(200)
            .send({result: 0, err: "删除失败"});
	    throw e;
    }

    let sql = "DELETE FROM banner WHERE banner_id = ?";

    mysql.connection.query(sql, [banner_id], (err, result) => {
        if (err) throw err;
        else {
            res.status(200)
                .send({result: 1});
        }
    });
});

// 上传轮播图
router.post("/changeSwiper", multipartMiddleware, (req, res) => {

    // 获取文件对象
    let img = req.files.img_url; // 轮播图
    let banner_id = uuid.v4();
    /*{
        fieldName: 'img',
        originalFilename: '11.jpg',
        path: 'C:\\Users\\Joush\\AppData\\Local\\Temp\\z8OCaQU62AsTXeqQdy29oovr.jpg',
        headers: [Object],
        size: 60537,
        name: '11.jpg',
        type: 'image/jpeg'
    }*/

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
    let img_url = host + "/wxapp/image/banner/" + name;
    mysql.connection.query(sql,[banner_id,img_url],(err,result)=>{
        if (err) {
            res.send({result: 0, err: "修改失败"});
            throw err;
        } else {
            res.send({result: 1});
        }
    });
});

// 获取首页显示的心理测试
router.get("/getHomePsyTest", (req, res) => {
    let response = {
        data: []
    }
    let sql =   "SELECT" +
                    " test_id," +  // 测试id
                    " name," +     // 测试名字
                    " introduction" +  // 测试简介
                " FROM" +
                    " psy_test" +  // 心理测试表
                " WHERE" +
                    " is_in_home = 1"; // 查询在首页的信息

    mysql.connection.query(sql, [], (err, result) => {
        let obj = {};
        for (let i = 0; i< result.length; i++){
            obj.test_id = result[i].test_id;
            obj.name = result[i].name;
            obj.introduction = result[i].introduction;
            response.data.push(obj);
            // 置空
            obj = {};
        }
        res.status(200)
            .send(JSON.stringify(response));
    });
});

// 获取首页显示的咨询师
router.get("/getHomeConsultant", (req, res) => {
    let response = {
        data: []
    }
    let sql =   "SELECT" +
                    " consultant_id," +  // 咨询师id
                    " consultant_name," +     // 咨询师名字
                    " img_url" +  // 咨询师图片地址
                " FROM" +
                    " consultant" + // 咨询师表
                " WHERE" +
                    " is_in_home = 1"; // 查询在首页的信息

    mysql.connection.query(sql, [], (err, result) => {
        let obj = {};
        for (let i = 0; i< result.length; i++){
            obj.consultant_id = result[i].consultant_id;
            obj.consultant_name = result[i].consultant_name;
            obj.img_url = result[i].img_url;
            response.data.push(obj);
            // 置空
            obj = {};
        }
        res.status(200)
            .send(JSON.stringify(response));
    });
});

// 获取首页显示的咨询师
router.get("/getHomeCourse", (req, res) => {
    let response = {
        data: []
    }
    let sql =   "SELECT" +
                    " course_id," +  // 课程id
                    " title" +  // 课程标题
                " FROM" +
                    " course" + // 课程表
                " WHERE" +
                    " is_in_home = 1"; // 查询在首页的信息

    mysql.connection.query(sql, [], (err, result) => {
        let obj = {};
        for (let i = 0; i< result.length; i++){
            obj.course_id = result[i].course_id;
            obj.title = result[i].title;
            response.data.push(obj);
            // 置空
            obj = {};
        }
        res.status(200)
            .send(JSON.stringify(response));
    });
});



// 修改EAP
router.post("/changeEap", multipartMiddleware, (req, res) => {

    let eap_id = 1; // eap_id
    let title = req.body.title; // 咨询师简介
    let subtitle = req.body.subtitle; // 咨询师擅长领域

    // 获取文件对象
    let img_url = req.files.img_url; // 咨询师照片图片
    let details_img_url = req.files.details_img_url; // 咨询师详情页照片

    if (img_url.size > 0 && details_img_url.size > 0) { // 拼接文件名
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
    }

    let sql =   "UPDATE" +
                    " eap" +
                " SET " +
                    "title = ?," +   // 修改咨询师介绍
                    "subtitle = ?" + // 修改咨询师擅长领域
                " WHERE " +
                    "eap_id = ?";
    // 更新数据库
    mysql.connection.query(sql, [title, subtitle, eap_id], (err, result) => {
        if (err) {
            res.send({result: 0, err: "文字上传失败"});
            throw err;
        } else {
            res.send({result: 1});
        }
    });
});

module.exports = router;
