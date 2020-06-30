let express = require("express");
let app = express();
// let mysql = require("./util/mysql");


// 配置路由
let wxappHomeRouter = require("./routes/wxapp/home");
let wxappDiscoverRouter = require("./routes/wxapp/discover");
let wxappMyRouter = require("./routes/wxapp/my");

app.use("/wxapp/home", wxappHomeRouter);
app.use("/wxapp/discover", wxappDiscoverRouter);
app.use("/wxapp/my", wxappMyRouter);


/*
    上传文件 multer
 */


app.use(express.static("./public"));

app.get("/", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end("<h1>Hello</h1>");
});


app.listen(3000);
