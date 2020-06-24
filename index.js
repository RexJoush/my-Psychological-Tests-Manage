let express = require("express");
let app = express();
let mysql = require("./util/mysql");


// 配置路由
let wxappHomeRouter = require("./routes/wxapp/home");
let wxappDiscoverRouter = require("./routes/wxapp/discover");
let wxappMyRouter = require("./routes/wxapp/my");

app.use("/wxapp/home", wxappHomeRouter);
app.use("/wxapp/discover", wxappDiscoverRouter);
app.use("/wxapp/my", wxappMyRouter);

// http.createServer(app).listen(3000,function(){
//
// });



/*
    上传文件 multer
 */



app.use(express.static("./public"));

app.get("/", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end("<h1>Hello</h1>");
});

/*
    wxapp
 */
    // 获取轮播图
    // app.get("/test",(req,res)=>{
    //     console.log(req.query);
    //     let arr = [];
    //     for (let i = 1; i < 7; i++){
    //         let obj = {};
    //         let imgUrl = "http://www.rexjoush.com:3000/wxapp/image/banner/"+ i +".jpg";
    //         obj.value = i;
    //         obj.label = imhUrl;
    //         arr.push(obj);
    //     }
    //
    //     res.end(JSON.stringify(arr));
    //
    // })




    mysql.connection.query("select * from pt_user",(err,result)=>{
        console.log(result);
    })

    // console.log(mysql.connection);

app.listen(3000);
