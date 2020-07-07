let express = require("express");
let router = express.Router();
let multipart = require('connect-multiparty');
let multipartMiddleware = multipart();
let fs = require("fs");
let uuid = require("uuid");
let mysql = require("../../util/mysql");


// 添加心理测试
router.post("/addPsyTest", multipartMiddleware, (req, res) => {

    let test_id = uuid.v4(); // 测试 id
    let name = req.body.name; // 测试名字
    let introduction = req.body.introduction; // 测试简介
    // 获取文件对象
    let img = req.files.details_img_url; // 测试详情图片

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

    // 更新数据库
    let sql = "INSERT INTO psy_test (test_id, name, introduction, details_img_url) VALUES (?,?,?,?)";
    let img_url = "http://www.rexjoush.com:3000/wxapp/image/test_details/" + fileName;

    mysql.connection.query(sql, [test_id, name, introduction, img_url], (err, result) => {
        if (err) {
            res.send({result: 0, err: "文字上传失败"});
            throw err;
        } else {
            res.send({result: 1});
        }
    });
});

// 添加咨询师
router.post("/addConsultant", multipartMiddleware, (req, res) => {

    let consultant_id = uuid.v4(); // 咨询师 id
    
    let consultant_img = req.files.img_url; // 咨询师头像
    let introduction = req.body.introduction // 咨询师简介
    let expertise = req.body.expertise; // 咨询师擅长领域
    let price = req.body.price; // 咨询价格，每小时
    let form = req.body.form; // 咨询形式
    // 获取文件对象
    let details_img = req.files.details_img_url; // 咨询师详情图片

    // 拼接文件名
    let fileName = consultant_id + ".jpg";
    let path1 = consultant_img.path;
    let path2 = details_img.path;
    try {
        // 获取上传的临时图片对象
        let fd1 = fs.readFileSync(path1);
        let fd2 = fs.readFileSync(path2);
        // 将图片写入咨询师头像的位置
        fs.writeFileSync("./public/wxapp/image/consultant/" + fileName, fd1);
        // 将图片写入咨询师详情的位置
        fs.writeFileSync("./public/wxapp/image/consultant_details/" + fileName, fd2);

        // 将临时图片删除
        fs.unlinkSync(path1);
        fs.unlinkSync(path2);
    } catch (e) {
        res.send({result: 0, err: "图片上传失败"});
        throw e;
    }

    // 更新数据库
    let sql = "INSERT INTO psy_test (consultant_id, img_url, introduction, expertise, price, form, details_img_url) VALUES (?,?,?,?,?,?,?)";
    let img_url = "http://www.rexjoush.com:3000/wxapp/image/consultant/" + fileName;
    let details_img_url = "http://www.rexjoush.com:3000/wxapp/image/consultant_details/" + fileName;
    mysql.connection.query(sql, [consultant_id, img_url, introduction, expertise, price, form, details_img_url], (err, result) => {
        if (err) {
            res.send({result: 0, err: "文字上传失败"});
            throw err;
        } else {
            res.send({result: 1});
        }
    });
});
module.exports = router;