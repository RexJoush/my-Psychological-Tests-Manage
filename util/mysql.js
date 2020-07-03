let mysql = require("mysql");
let fs = require("fs");

// 读取 json 数据
let data = fs.readFileSync(__dirname + "/mysqlProperties.json","utf-8");

let mysqlObj = JSON.parse(data);

// 创建数据库连接
let connection = mysql.createConnection({
    host     : mysqlObj.host,
    user     : mysqlObj.user,
    password : mysqlObj.password,
    port     : mysqlObj.port,
    database : mysqlObj.database,
});

// 打开连接
connection.connect();

module.exports.connection = connection;
