let express = require("express");
let app = express();
// let mysql = require("./util/mysql");


// 配置路由
let wxappHomeRouter = require("./routes/wxapp/home");
let wxappDiscoverRouter = require("./routes/wxapp/discover");
let wxappMyRouter = require("./routes/wxapp/my");
let webappLoginRouter = require("./routes/webapp/login");
let webappHomeRouter = require("./routes/webapp/home");
let webappDiscoverRouter = require("./routes/webapp/discover");

app.use("/wxapp/home", wxappHomeRouter);
app.use("/wxapp/discover", wxappDiscoverRouter);
app.use("/wxapp/my", wxappMyRouter);
app.use("/webapp/login",webappLoginRouter);
app.use("/webapp/home",webappHomeRouter);
app.use("/webapp/discover",webappDiscoverRouter);

/*
    上传文件 multer
 */


app.use(express.static("./public"));

app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();

});


app.get("/", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end("<h1>Hello</h1>");
});


app.listen(3000);
