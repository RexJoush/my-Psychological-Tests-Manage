
/*

    首页 页面用到的数据表

*/

-- 轮播图表
CREATE TABLE banner(
    banner_id VARCHAR(255), -- 轮播图片id
    img_url VARCHAR(255) -- 轮播图地址
);

-- 心里测评表
CREATE TABLE psy_test(
    test_id VARCHAR(255), -- 测试 id
    name VARCHAR(255), -- 测试名字
    introduction VARCHAR(255), -- 测试简介
    -- harvest VARCHAR(1024), -- 您的收获
    -- applicable_people VARCHAR(255), -- 适用人群
    category_id VARCHAR(255), -- 测试类别
    details_img_url VARCHAR(255), -- 详情图片
    is_in_home INT -- 是否在首页显示
);

-- 测试类别
CREATE TABLE test_category(
    category_id VARCHAR(255), -- 分类id
    category_name VARCHAR(20) -- 分类名字
);


-- 咨询师表
CREATE TABLE consultant(
    consultant_id VARCHAR(255), -- 咨询师id
    img_url VARCHAR(255), -- 照片
    consultant_name VARCHAR(20), -- 咨询师名字
    sex VARCHAR(5), -- 咨询师性别
    introduction VARCHAR(1024), -- 咨询师简介
    expertise VARCHAR(255), -- 擅长领域
    price VARCHAR(20), -- 每小时咨询费用
    form VARCHAR(255), -- 咨询形式
    -- personal_introduction VARCHAR(2048), -- 个人介绍
    -- educational_experience VARCHAR(4096), -- 教育培训经历
    -- qualification VARCHAR(1024), -- 资格证书
    -- consultation_duration VARCHAR(1024), -- 咨询时长
    details_img_url VARCHAR(255), -- 咨询师详情
    is_in_home INT -- 是否在首页显示
);

-- 线上课程表
CREATE TABLE course (
    course_id VARCHAR(255), -- 课程id
    img_url VARCHAR(255), -- 课程的图片
    title VARCHAR(255), -- 课程标题
    subtitle VARCHAR(255), -- 课程副标题
    details_introduction_img VARCHAR(255), -- 课程详细简介图片
    consultant_id VARCHAR(255), -- 对应咨询师的id
    course_outline VARCHAR(4096), -- 课程大纲
    course_catalogue VARCHAR(4096), -- 课程目录
    is_course INT, -- 线上课程还是心理活动，1:课程，0:活动
    is_in_home INT -- 是否在首页显示
);

-- eap表

CREATE TABLE eap (
    eap_id VARCHAR(255), -- eap id
    img_url VARCHAR(255), -- 介绍图片
    title VARCHAR(255), -- 标题
    subtitle VARCHAR(255), -- 副标题
    details_img_url VARCHAR(255) --详细介绍图片
);

