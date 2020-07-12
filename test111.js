
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
    " test_id," + // 测试 id
    " name," +  // 测试名字
    " introduction," +  // 测试简介
    " p.category_id," +
    " category_name" +  // 测试简介
    " FROM" +
    " psy_test p,test_category t " +
    " WHERE" +
    " p.category_id = t.category_id";
    console.log(sql);
mysql.connection.query(sql,[],(err,result)=>{
    console.log(result);
})