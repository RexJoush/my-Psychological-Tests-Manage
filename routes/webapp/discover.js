let express = require("express");
let router = express.Router();
let multipart = require('connect-multiparty');
let multipartMiddleware = multipart();
let fs = require("fs");
let uuid = require("uuid");
let mysql = require("../../util/mysql");
let host = require("../../util/utils");


// 获取心理测试列表
router.get("/getPsyTestList", (req, res) => {
    let response = {
        data: []
    }
    let obj = {};
    let sql =   "SELECT" +
                    " test_id," + // 测试 id
                    " name," +  // 测试名字
                    " introduction" +  // 测试简介
                " FROM" +
                    " psy_test";
    mysql.connection.query(sql, [], (err, result) => {
        for (let i = 0; i < result.length; i++) {
            obj.test_id = result[i].test_id;
            obj.name = result[i].name;
            obj.introduction = result[i].introduction;

            // 封装数组
            response.data.push(obj);
            // 对象置空
            obj = {};
        }
        res.status(200)
            .send(JSON.stringify(response));
    });
});



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
    let sql = "INSERT INTO psy_test (test_id, name, introduction, details_img_url, is_in_home) VALUES (?,?,?,?,?)";
    let img_url_add = host + "/wxapp/image/test_details/" + fileName;

    mysql.connection.query(sql, [test_id, name, introduction, img_url_add], (err, result) => {
        if (err) {
            res.send({result: 0, err: "文字上传失败"});
            throw err;
        } else {
            res.send({result: 1});
        }
    });
});



// 删除心理测试
router.get("/delPsyTest", (req, res) => {
    let test_id = req.query.test_id;
    try {
        fs.unlinkSync("./public/wxapp/image/test_details/" + test_id + ".jpg");
    } catch (e){
        res.status(200)
            .send({result: 0, err: "删除失败"});
        throw e;
    }

    let sql = "DELETE FROM psy_test WHERE test_id = ?";

    mysql.connection.query(sql, [test_id], (err, result) => {
        if (err) throw err;
        else {
            res.status(200)
                .send({result: 1});
        }
    });
});


// 获取测试类别列表
router.get("/getCategoryList", (req, res) => {
    let response = {
        data: []
    }
    let obj = {};
    let sql =   "SELECT" +
                    " category_id," + // 咨询师 id
                    " category_name" +  // 咨询师照片
                " FROM" +
                    " test_category";
    mysql.connection.query(sql, [], (err, result) => {
        for (let i = 0; i < result.length; i++) {
            obj.category_id = result[i].category_id;
            obj.category_name = result[i].category_name;

            // 封装数组
            response.data.push(obj);
            // 对象置空
            obj = {};
        }
        res.status(200)
            .send(JSON.stringify(response));
    });
});

// 添加测试类别
router.get("/addCategory", (req, res) => {

    let category_id = uuid.v4(); // 测试 id
    let category_name = req.query.category_name; // 测试类别名字

    // 更新数据库
    let sql = "INSERT INTO test_category (category_id, category_name) VALUES (?,?)";
    mysql.connection.query(sql, [category_id, category_name], (err, result) => {
        if (err) {
            res.send({result: 0, err: "上传失败"});
            throw err;
        } else {
            res.send({result: 1});
        }
    });
});

// 删除测试类别
router.get("/delCategory", (req, res) => {

    let category_id = req.query.category_id; // 测试 id
    // 更新数据库
    let sql = "DELETE FROM test_category WHERE category_id = ?";
    mysql.connection.query(sql, [category_id], (err, result) => {
        if (err) {
            res.send({result: 0, err: "删除失败"});
            throw err;
        } else {
            res.send({result: 1});
        }
    });
});


// 获取咨询师列表
router.get("/getConsultantList", (req, res) => {
    let response = {
        data: []
    }
    let obj = {};
    let sql =  "SELECT" +
                    " consultant_id," + // 咨询师 id
                    " consultant_name," +  // 咨询师名字
                    " img_url" +  // 咨询师照片
                " FROM" +
                    " consultant";
    mysql.connection.query(sql, [], (err, result) => {
        for (let i = 0; i < result.length; i++) {
            obj.consultant_id = result[i].consultant_id;
            obj.consultant_name = result[i].consultant_name;
            obj.img_url = result[i].img_url;

            // 封装数组
            response.data.push(obj);
            // 对象置空
            obj = {};
        }
        res.status(200)
            .send(JSON.stringify(response));
    });
});


// 添加咨询师
router.post("/addConsultant", multipartMiddleware, (req, res) => {

    let consultant_id = uuid.v4(); // 咨询师 id

    let consultant_img = req.files.img_url; // 咨询师头像
    let name = req.body.name; //咨询师名字
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
    let sql = "INSERT INTO consultant (consultant_id, img_url, name, introduction, expertise, price, form, details_img_url, is_in_home) VALUES (?,?,?,?,?,?,?,?,?)";
    let img_url_add = host + "/wxapp/image/consultant/" + fileName;
    let details_img_url_add = host + "/wxapp/image/consultant_details/" + fileName;
    mysql.connection.query(sql, [consultant_id, img_url_add, name, introduction, expertise, price, form, details_img_url_add, 0], (err, result) => {
        if (err) {
            res.send({result: 0, err: "文字上传失败"});
            throw err;
        } else {
            res.send({result: 1});
        }
    });
});

// 删除咨询师
router.get("/delConsultant", (req, res) => {
    let consultant_id = req.query.consultant_id;
    try {
        fs.unlinkSync("./public/wxapp/image/consultant/" + consultant_id + ".jpg");
        fs.unlinkSync("./public/wxapp/image/consultant_details/" + consultant_id + ".jpg");
    } catch (e){
        res.status(200)
            .send({result: 0, err: "删除失败"});
        throw e;
    }

    let sql = "DELETE FROM consultant WHERE consultant_id = ?";

    mysql.connection.query(sql, [consultant_id], (err, result) => {
        if (err) throw err;
        else {
            res.status(200)
                .send({result: 1});
        }
    });
});


// 获取线上课程列表
router.get("/getCourseList", (req, res) => {
    let response = {
        data: []
    }
    let obj = {};
    let sql =   "SELECT" +
                    " course_id," + // 课程 id
                    " title" +  // 课程名
                " FROM" +
                    " course";
    mysql.connection.query(sql, [], (err, result) => {
        for (let i = 0; i < result.length; i++) {

            obj.course_id = result[i].course_id;
            obj.title = result[i].title;

            // 封装数组
            response.data.push(obj);
            // 对象置空
            obj = {};
        }
        res.status(200)
            .send(JSON.stringify(response));
    });
});



// 添加线上课程
router.post("/addCourse", multipartMiddleware, (req, res) => {
    // console.log(req.body);
    let course_id = uuid.v4(); // 课程 id
    let img_url = req.files.img_url; // 课程图片
    let title = req.body.title; // 课程标题
    let subtitle = req.body.subtitle; // 课程副标题
    let details_introduction_img = req.files.details_introduction_img; // 该课程的详细介绍图片
    let consultant_id = req.body.consultant_id; // 上该门课的老师


    let name = course_id + ".jpg";

    // 获取文件临时路径
    let path1 = img_url.path; // 课程图片
    let path2 = details_introduction_img.path; // 课程详细介绍图片
    try {
        // 获取上传的临时图片对象
        let fd1 = fs.readFileSync(path1); // 课程照片
        let fd2 = fs.readFileSync(path2); // 课程详细照片

        // 将图片写入课程位置
        fs.writeFileSync("./public/wxapp/image/course/" + name, fd1);
        fs.writeFileSync("./public/wxapp/image/course_details/" + name, fd2);

        // 将临时图片删除
        fs.unlinkSync(path1);
        fs.unlinkSync(path2);
    } catch (e) {
        res.send({result: 0, err: "图片上传失败"});
        throw e;
    }

    // 拼接图片地址
    let img_url_add = host + "/wxapp/image/course/" + name;
    let details_introduction_img_add = host + "/wxapp/image/course_details/" + name;

    let sql =   "INSERT INTO" + 
                    " course" +
                " (course_id, img_url, title, subtitle, details_introduction_img, consultant_id, is_in_home) " +
                " VALUES" +
                    " (?,?,?,?,?,?,?)";
    // 更新数据库
    mysql.connection.query(sql, [course_id, img_url_add, title, subtitle, details_introduction_img_add, consultant_id, 0], (err, result) => {
        if (err) {
            res.send({result: 0, err: "文字上传失败"});
            throw err;
        } else {
            res.send({result: 1});
        }
    });
});


// 删除线上课程
router.get("/delCourse", (req, res) => {
    let course_id = req.query.course_id;
    try {
        fs.unlinkSync("./public/wxapp/image/course/" + course_id + ".jpg");
        fs.unlinkSync("./public/wxapp/image/course_details/" + course_id + ".jpg");
    } catch (e){
        res.status(200)
            .send({result: 0, err: "删除失败"});
        throw e;
    }

    let sql = "DELETE FROM course WHERE course_id = ?";

    mysql.connection.query(sql, [course_id], (err, result) => {
        if (err) throw err;
        else {
            res.status(200)
                .send({result: 1});
        }
    });
});


module.exports = router;