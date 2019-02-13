import { Notification } from 'element-ui'

export default {
  // 接口声明
  httpInterface: {
    // 用户模块
    10001: {type: 'POST', name: '用户登录', url: '/wzq/user/login.do'},
    10002: {type: 'GET', name: '退出登录', url: '/wzq/user/loginout.do'},

    // 文章模块
    20001: {type: 'POST', name: '文章新增', url: '/wzq/blog/add.do'},
    20002: {type: 'POST', name: '文件上传', url: '/wzq/blog/upload-file.do'},
    20003: {type: 'POST', name: '类别新增', url: '/wzq/blog/typeAdd.do'},
    20004: {type: 'GET', name: '类别列表', url: '/wzq/blog/typeList.do'}
  },
  // 处理完成
  handleComplete: {
    // 成功回调函数
    success: (api, json, success) => {
      success && success(json)
    },
    // 默认错误处理
    error: (api, json, error) => {
      Notification.error({
        title: '错误',
        message: json.message
      })
      error && error()
    },
    // 没有权限
    noAuth: (api, json, error) => {
      Notification.success({
        title: '错误',
        message: '登录状态已失效,请重新登录'
      })
      // User.logout();
      // Router.toLaunch('/user/login');
      error && error()
    },
    // 没有网络
    noNetwork: (api, json, error) => {
      Notification.success({
        title: '错误',
        message: '网络访问失败,请稍后再试'
      })
      error && error()
    },
    // 没有网络
    sysUpdate: (api, json, error) => {
      Notification.success({
        title: '错误',
        message: '系统维护中,请稍后再试'
      })
      error && error()
    }
  }
}
