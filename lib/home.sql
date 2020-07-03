
/*

    首页 页面用到的数据表

*/


-- 心里测评表
CREATE TABLE psy_test(
    test_id INT, -- 测试 id
    name VARCHAR(255), -- 测试名字
    introduction VARCHAR(255), -- 测试简介
    -- harvest VARCHAR(1024), -- 您的收获
    -- applicable_people VARCHAR(255), -- 适用人群
    details_img_url VARCHAR(255) -- 详情图片
);

-- 咨询师表
CREATE TABLE consultant(
    consultant_id INT, -- 咨询师id
    img_url VARCHAR(255), -- 照片
    introduction VARCHAR(1024), -- 咨询师简介
    expertise VARCHAR(255), -- 擅长领域
    price VARCHAR(20), -- 每小时咨询费用
    form VARCHAR(255), -- 咨询形式
    -- personal_introduction VARCHAR(2048), -- 个人介绍
    -- educational_experience VARCHAR(4096), -- 教育培训经历
    -- qualification VARCHAR(1024), -- 资格证书
    -- consultation_duration VARCHAR(1024), -- 咨询时长
    details_img_url VARCHAR(255) -- 咨询师详情
);

-- 线上课程表
CREATE TABLE course (
    course_id INT, -- 课程id
    img_url VARCHAR(255), -- 课程的图片
    title VARCHAR(255), -- 课程标题
    subtitle VARCHAR(255), -- 课程副标题
    details_introduction VARCHAR(2048), -- 课程详细简介
    consultant_id INT, -- 对应咨询师的id
    course_outline VARCHAR(4096), -- 课程大纲
    course_catalogue VARCHAR(4096) -- 课程目录

);

-- eap表

CREATE TABLE eap (
    eap_id INT, -- eap id
    img_url VARCHAR(255), -- 介绍图片
    title VARCHAR(255), -- 标题
    subtitle VARCHAR(255), -- 副标题
    details_img_url VARCHAR(255) --详细介绍图片
);

