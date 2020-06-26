


-- 咨询师表
create table counseling(
    consultant_id INT, -- 咨询师id
    image_url VARCHAR(255), -- 照片
    evaluate VARCHAR(1024), -- 评价
    expertise_field VARCHAR(255), -- 擅长领域
    cost INT, -- 每小时咨询费用
    consult_style VARCHAR(1024), -- 咨询形式
    personal_introduction VARCHAR(2048), -- 个人介绍
    educational_experience VARCHAR(4096), -- 教育培训经历
    qualification VARCHAR(1024), -- 资格证书
    consultation_duration VARCHAR(1024), -- 咨询时长
);

-- 线上课程表
create table course (
    id INT, -- 课程id
    brief_introduction VARCHAR(255), -- 课程简介
    course_imgurl VARCHAR(255), -- 课程简介的图片
    title VARCHAR(255), -- 课程标题
    subtitle VARCHAR(255), -- 课程副标题
    detailed_introduction VARCHAR(2048), -- 课程详细简介
    consultant_id INT, -- 对应咨询师的id
    course_outline VARCHAR(4096), -- 课程大纲
    course_catalogue VARCHAR(4096) -- 课程目录

);