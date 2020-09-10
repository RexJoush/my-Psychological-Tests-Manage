exports.host = "https://www.xinliceliang.com:39666";
exports.returnFunc = function (err, res) {
    if (err) {
        res.status(200)
            .send({result: 0, err: "操作失败"});
        throw err;
    } else {
        res.status(200)
            .send({result: 1});
    }
};
let response = {
    data: []
}
exports.sendFunc = function (err, res, result) {
    if (err) throw err
    else {
        // 赋值
        response.data = result;
        // 返回
        res.status(200)
            .send(JSON.stringify(response));
        // 置空
        response.data = [];
    }
}
// module.exports = host;
// module.exports = a;