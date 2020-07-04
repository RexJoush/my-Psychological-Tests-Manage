let express = require("express");
let router = express.Router();
let multipart = require('connect-multiparty');
let multipartMiddleware = multipart();
let fs = require("fs");
let { v4: uuidv4 } = require("uuid");
let mysql = require("../../util/mysql");

// 修改心理测试
router.post("/addPsyTest", multipartMiddleware, (req, res) => {

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


module.exports = router;