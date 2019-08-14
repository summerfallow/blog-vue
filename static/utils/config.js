
module.exports = {
  api: {
    // 用户模块
    10001: {type: 'POST', name: '用户登录', url: '/wzq/user/login.do'},
    10002: {type: 'GET', name: '退出登录', url: '/wzq/user/loginout.do'},

    // 文章模块
    20001: {type: 'POST', name: '文章新增', url: '/wzq/blog/add.do'},
    20002: {type: 'POST', name: '文件上传', url: '/wzq/blog/upload-file.do'},
    20003: {type: 'POST', name: '类别新增', url: '/wzq/blog/typeAdd.do'},
    20004: {type: 'GET', name: '类别列表', url: '/wzq/blog/typeList.do'},
    20005: {type: 'GET', name: '文章列表', url: '/wzq/blog/list.do'},
    20006: {type: 'GET', name: '文章删除', url: '/wzq/blog/delete.do'},
    20007: {type: 'POST', name: '文章修改', url: '/wzq/blog/edit.do'},
    20008: {type: 'GET', name: '文章详情', url: '/wzq/blog/detail.do'},
    20009: {type: 'GET', name: '文章类型删除', url: '/wzq/blog/typeDel.do'},
    20010: {type: 'GET', name: '获取所有文章', url: '/wzq/blog/archives.do'},
    20011: {type: 'GET', name: '获取文章归档年份', url: '/wzq/blog/archivesYear.do'},
  },
};
