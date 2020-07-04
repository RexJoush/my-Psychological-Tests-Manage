let express = require("express");
let router = express.Router();
let multipart = require('connect-multiparty');
let multipartMiddleware = multipart();
let fs = require("fs");

let mysql = require("../../util/mysql");



// 获取轮播图
router.get("/getSwiper", (req, res) => {
    let response = {
        data: []
    }

    let sql =   "SELECT" +
                    " banner_id," + // 图片id
                    " img_url " +  // 图片地址
                " FROM" +          // 修改测试名称
                    " banner"; +   // 修改测试简介

        mysql.connection.query(sql, [], (err, result) => {
            let obj = {};
            for (let i = 0; i< result.length; i++){
                obj.fileid = result[i].banner_id;
                obj.banner_url = result[i].img_url;
                response.data.push(obj);
            }

            res.status(200)
                .send(JSON.stringify(response));
        })
});


// 删除轮播图
router.get("/delSwiper", (req, res) => {
    let banner_id = req.query.fileid;

    fs.unlinkSync("./public/wxapp/image/banner/ " + banner_id + ".jpg");


    let sql = "DELETE FROM banner WHERE banner = ?";

    mysql.connection.query(sql, [banner_id], (err, result) => {
        if (err) throw err;
        else {
            res.status(200)
                .send({tips: "删除成功"});
        }
    });
});

// 修改轮播图
router.post("/changeSwiper", multipartMiddleware, (req, res) => {
    // console.log(req.files.imgs);
    // let arr = req.files.imgs;
    // 获取文件对象
    let img = req.files.img_url; // 轮播图

    /*{
        fieldName: 'img',
        originalFilename: '11.jpg',
        path: 'C:\\Users\\Joush\\AppData\\Local\\Temp\\z8OCaQU62AsTXeqQdy29oovr.jpg',
        headers: [Object],
        size: 60537,
        name: '11.jpg',
        type: 'image/jpeg'
    }*/

    for (let i = 0; i < 6; i++) {
        let name = (i + 1) + ".jpg";
        let path = arr[i].path;
        try {
            // 获取上传的临时图片对象
            let fd = fs.readFileSync(path);

            // 将图片写入轮播图的位置
            fs.writeFileSync("./public/wxapp/image/banner/" + name, fd);
            // 将临时图片删除
            fs.unlinkSync(path);
        } catch (e) {
            res.status(200)
                .send({result: 0, err: "上传失败"});
            throw e;
        }
    }

    // 返回登录成功
    res.status(200)
        .send({result: 1});

});




// 修改心理测试
router.post("/changePsyTest", multipartMiddleware, (req, res) => {

    let test_id = req.body.test_id; // 测试 id
    let name = req.body.name; // 测试名字
    let introduction = req.body.introduction; // 测试简介
    // 获取文件对象
    let img = req.files.details_img_url; // 测试详情图片

    // 上传图片修改
    if(img.size > 0){
        // 拼接文件名
        let fileName = test_id + ".jpg";
        let path = img.path;
        try {
            // 获取上传的临时图片对象
            let fd = fs.readFileSync(path);

            // 将图片写入心理测试的位置
            fs.writeFileSync("./public/wxapp/image/test_details/" + fileName, fd);
            // 将临时图片删除
            fs.unlinkSync(path);
        } catch (e) {
            res.send({result: 0, err: "图片上传失败"});
            throw e;
        }
    }

    let sql =   "UPDATE" +
                    " psy_test" +
                " SET " +
                    "name = ?," +        // 修改测试名称
                    "introduction = ?" + // 修改测试简介
                " WHERE " +
                    "test_id = ?";
    // 更新数据库
    mysql.connection.query(sql, [name, introduction, test_id], (err, result) => {
        if (err) {
            res.send({result: 0, err: "文字上传失败"});
            throw err;
        } else {
            res.send({result: 1});
        }
    });
});


// 修改咨询师
router.post("/changeConsultant", multipartMiddleware, (req, res) => {
    // console.log(req.body);
    let consultant_id = req.body.consultant_id; // 咨询师 id
    let introduction = req.body.introduction; // 咨询师简介
    let expertise = req.body.expertise; // 咨询师擅长领域
    let price = req.body.price; // 咨询师价格
    let form = req.body.form; // 咨询形式

    // 获取文件对象
    let img_url = req.files.img_url; // 咨询师照片图片
    let details_img_url = req.files.details_img_url; // 咨询师详情页照片

    // 上传图片再进行更改
    if (img_url.size > 0 && details_img_url.size > 0) {
        // 拼接文件名
        let img_urlName = consultant_id + ".jpg";
        let details_img_urlName = consultant_id + ".jpg";

        // 获取文件临时路径
        let path1 = img_url.path;
        let path2 = details_img_url.path;
        try {
            // 获取上传的临时图片对象
            let fd1 = fs.readFileSync(path1); // 咨询师照片
            let fd2 = fs.readFileSync(path2); // 咨询师详情图片

            // 将图片写入咨询师的位置
            fs.writeFileSync("./public/wxapp/image/consultant/" + img_urlName, fd1);
            fs.writeFileSync("./public/wxapp/image/consultant_details/" + details_img_urlName, fd2);

            // 将临时图片删除
            fs.unlinkSync(path1);
            fs.unlinkSync(path2);
        } catch (e) {
            res.send({result: 0, err: "图片上传失败"});
            throw e;
        }
    }

    let sql =   "UPDATE" +
                    " consultant" +
                " SET " +
                    "introduction = ?," +   // 修改咨询师介绍
                    "expertise = ?," + // 修改咨询师擅长领域
                    "price = ?," + // 修改咨询价格
                    "form = ?" + // 修改咨询形式
                " WHERE " +
                    "consultant_id = ?";
    // 更新数据库
    mysql.connection.query(sql, [introduction, expertise, price, form, consultant_id], (err, result) => {
        if (err) {
            res.send({result: 0, err: "文字上传失败"});
            throw err;
        } else {
            res.send({result: 1});
        }
    });
});


// 修改线上课程
router.post("/changeCourse", multipartMiddleware, (req, res) => {
    // console.log(req.body);
    let course_id = req.body.course_id; // 课程 id
    let title = req.body.title; // 课程标题
    let subtitle = req.body.subtitle; // 课程副标题
    let details_introduction = req.body.details_introduction; // 该课程的详细介绍
    let consultant_id = req.body.consultant_id; // 上该门课的老师

    // 获取文件对象
    let img = req.files.img_url; // 课程图片

    if (img.size > 0) { // 拼接文件名
        let name = course_id + ".jpg";

        // 获取文件临时路径
        let path = img.path;
        try {
            // 获取上传的临时图片对象
            let fd = fs.readFileSync(path); // 课程照片

            // 将图片写入课程位置
            fs.writeFileSync("./public/wxapp/image/course/" + name, fd);

            // 将临时图片删除
            fs.unlinkSync(path);
        } catch (e) {
            res.send({result: 0, err: "图片上传失败"});
            throw e;
        }
    }

    let sql =   "UPDATE" +
                    " course" +
                " SET " +
                    "title = ?," +   // 修改课程标题
                    "subtitle = ?," + // 修改课程副标题
                    "details_introduction = ?," + // 修改课程详细介绍
                    "consultant_id = ?" + // 修改讲该门课的老师
                " WHERE " +
                    "course_id = ?";
    // 更新数据库
    mysql.connection.query(sql, [title, subtitle, details_introduction, consultant_id, course_id], (err, result) => {
        if (err) {
            res.send({result: 0, err: "文字上传失败"});
            throw err;
        } else {
            res.send({result: 1});
        }
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