
/*

    我的 页面用到的数据表

*/

-- user表
CREATE TABLE psy_user (
    openId VARCHAR(255), -- 用户 openid
    nickName VARCHAR(255), -- 用户的微信名
    avatarUrl VARCHAR(255), -- 用户头像
    gender VARCHAR(5), -- 用户性别
    city VARCHAR(10), -- 用户城市
    province VARCHAR(10), -- 用户省份
    country VARCHAR(10), -- 用户国家
    psy_time VARCHAR(30) -- 首次访问时间
);

-- 用户心理测试表
CREATE TABLE user_pst (
    openid VARCHAR(255), -- 用户 openid
    test_id VARCHAR(255), -- 用户所做测试的id
    test_time VARCHAR(30) -- 所做测试的时间
);

-- 用户心理咨询表
CREATE TABLE user_counseling (
    openid VARCHAR(255), -- 用户 openid
    test_id VARCHAR(255), -- 用户所做咨询师的id
    counseling_time VARCHAR(30) -- 所做咨询的时间
);

-- 用户心理课程表
CREATE TABLE user_course (
    openid VARCHAR(255), -- 用户 openid
    test_id VARCHAR(255), -- 用户所上课程的id
    course_time VARCHAR(30) -- 所上课的时间
);

-- 用户心理成长表
CREATE TABLE user_grow (
    openid VARCHAR(255), -- 用户 openid
    test_id VARCHAR(255), -- 用户所做心理成长的id
    grow_time VARCHAR(30) -- 所做心理成长的时间
);