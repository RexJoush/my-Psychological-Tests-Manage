
let utility = require("utility");

let a = "111111";
let b = "akdsjfhjksdfhjakshfjkba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad";

// console.log(utility.md5(a));

// a9993e364706816aba3e25717850c26c9cd0d89d
// console.log(utility.sha1(a));
// console.log(utility.sha1(b));

let mysql = require("./util/mysql");



let utils = require("./util/utils");
// console.log(host.returnFunc());

let uuid = require("uuid");

let date = new Date();

// console.log(date.toLocaleTimeString());

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
    console.log(sql);
mysql.connection.query(sql,["111"],(err,result)=>{
    console.log(result);
})