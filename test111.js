let sql = "SELECT" +
    " detail_img_url" +  // 详情图片地址
    " FROM " +
    "psy_test" +
    " WHERE " +
    " test_id = ?";


// console.log(sql);

let utility = require("utility");

let a = "111111";
let b = "akdsjfhjksdfhjakshfjkba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad";

// console.log(utility.md5(a));

// a9993e364706816aba3e25717850c26c9cd0d89d
// console.log(utility.sha1(a));
// console.log(utility.sha1(b));

// let mysql = require("./util/mysql");

// mysql.connection.query("select password from psy_user where username = 'admin'",(err, result)=>{
//
//     // console.log(result[0].password === utility.sha1(a));
//     console.log(result[0].password);
// });

// mysql.connection.query()

// console.log((!(~+[])+{})[--[~+""][+[]]*[~+[]]+~~!+[]]+({}+[])[[~!+[]]*~+[]]);
let { v4: uuidv4 } = require('uuid');
// uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
console.log(uuidv4());


