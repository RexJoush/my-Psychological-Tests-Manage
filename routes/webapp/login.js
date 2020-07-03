/*
    网页端 登录验证
 */

let express = require("express");
let router = express.Router();

let mysql = require("../../util/mysql");

let utility = require("utility");


// 验证登录
router.get("/login", (req, res) => {
    let username = req.query.username;
    let password = req.query.password;

    let sql =   "SELECT" +
                    " password" +
                " FROM " +
                    "psy_user " +
                " WHERE " +
                    "id = 1";

    mysql.connection.query(sql,[username],(err, result) =>{
        if (err) throw err;
        else {
            if (result[0].password === utility.sha1(password)) {
                res.cookie("loginStatus","1");
                res.send({result:1});
            } else {
                res.send({result:0,err:"用户名或密码错误"});
            }
        }
    });
});


// router.get("/updatePassword",(req, res) => {
//
//     let newPass = req.query.password;
//
// });


module.exports = router;