exports.host = "http://www.rexjoush.com:3000";
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

// module.exports = host;
// module.exports = a;