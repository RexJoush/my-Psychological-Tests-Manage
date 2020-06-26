/*
    小程序端发现页的 路由
 */
let express = require("express");
let router = express.Router();

router.get('/', (req, res) => {
    console.log(req.query);
    res.send("hello world");
})

module.exports = router;