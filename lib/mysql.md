## 首页
    - 心理测评
        列举六个测试，其中4个常用测试 + 1个推广测试 + 1个低价测试，并包含各个测试的简介
        = 测试介绍页面的展示
            您的收获，适用人群，测评参数（功能，对象，方式，材料，时长，参考文献，报告样例，研发团队，测评须知）
            Q1.测评参数的内容展现样式

    - 心理咨询
        列举3个咨询师的照片，20个字以内的评价，擅长领域，每小时咨询费用，咨询形式
        = 心理咨询师介绍页
            包含上一级中的所有内容，并且加入咨询师简历（个人介绍，教育培训经历，资格证书，擅长领域，咨询时长）

            consultant --咨询师表
                consultant_id varchar(255) -- 咨询师id
                image_url varchar(255) -- 照片
                evaluate varchar(1024) -- 评价
                expertise_field varchar(255) -- 擅长领域
                cost double(10,2) -- 每小时咨询费用
                consult_style varchar(1024) -- 咨询形式
                personal_introduction varchar(1024) -- 个人介绍
                educational_experience varchar(1024) -- 教育培训经历
                qualification varchar(1024) -- 资格证书
                consultation_duration varchar(1024) -- 咨询时长
 
    - 线上课程
        列举2个课程的简介，一张图片 + 标题 + 副标题

        course_introduction -- 课程简介表
            course_id varchar(255) -- 课程id
            image_url varchar(255) -- 照片
            main_title varchar(255) -- 主标题
            sub_title varchar(255) -- 副标题

        = 课程介绍
            课程详细介绍/咨询师介绍/课程大纲
            Q2.课程大纲以什么形式来展示

        = 课程目录
            课程目录
            Q3.课程目录以什么形式来展示
    - 员工辅助计划(EAP)
        EAP介绍
        = EAP定义/功能/客户群体介绍，在页面末尾点击“进入EAP”平台之后的页面/后端数据处理/报告生成

        eap -- EAP介绍表
            eap_introduction varchar(1024) -- EAP介绍
            eap_function varchar(1024) -- EAP功能
            customer_groups vatchar(1024) -- 客户群体


## 发现
    - 心理测评
    - 咨询服务
    - 线上课程
    - 心理成长活动
    - 心理测评通用平台
    - 远攻辅助计划(EAP)
## 我的
    - 心理测评
        = 已完成测评
    - 心理咨询
        = 已接受的心理咨询
    - 心理课程
        = 已接受的心理课程
    - 心理成长
        = 已接受的心理成长