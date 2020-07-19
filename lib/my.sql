
/*

    我的 页面用到的数据表

*/

-- user表
CREATE TABLE wxapp_user (
    openId VARCHAR(255), -- 用户 openid
    nickName VARCHAR(255), -- 用户的微信名
    avatarUrl VARCHAR(255), -- 用户头像
    gender VARCHAR(5), -- 用户性别
    city VARCHAR(10), -- 用户城市
    province VARCHAR(10), -- 用户省份
    country VARCHAR(10), -- 用户国家
    date VARCHAR(20), -- 首次访问日期
    time VARCHAR(20) -- 首次访问时间
);

-- 用户心理测试表
CREATE TABLE user_pst_test (
    openId VARCHAR(255), -- 用户 openid
    test_id VARCHAR(255), -- 用户所做测试的id
    date VARCHAR(30), -- 所做测试的日期
    time VARCHAR(30) -- 所做测试的时间
);

-- 用户心理咨询表
CREATE TABLE user_consultant (
    openId VARCHAR(255), -- 用户 openid
    consultant_id VARCHAR(255), -- 用户所做咨询师的id
    form VARCHAR(20), -- 咨询方式
    subscribe_time VARCHAR(20), -- 预约咨询的日期
    times VARCHAR(11), -- 咨询次数
    price VARCHAR(10), -- 花费
    date VARCHAR(30), -- 申请发起日期
    time VARCHAR(30) -- 申请发起时间
);

-- 用户心理课程表
CREATE TABLE user_course (
    openId VARCHAR(255), -- 用户 openid
    course_id VARCHAR(255), -- 用户所上课程的id
    price VARCHAR(11), -- 上课的价格
    date VARCHAR(30), -- 所上课的日期
    time VARCHAR(30) -- 所上课的时间
);

-- 用户心理成长表
-- CREATE TABLE user_grow (
--    open_id VARCHAR(255), -- 用户 openid
--    test_id VARCHAR(255), -- 用户所做心理成长的id
--    date VARCHAR(30) -- 所做心理成长的日期
--    time VARCHAR(30) -- 所做心理成长的时间
-- );