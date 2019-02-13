const userServices = require('../services/user')
const userCode = require('../codes/user')
const moment = require('moment')

module.exports = {

  /**
   * 用户注册
   * @param   {obejct} ctx 上下文对象
   */
  async register (ctx) {
    let formData = ctx.request.query
    let result = {
      success: false,
      message: ''
    }

    let validateResult = userServices.validatorSignUp(formData)

    if (validateResult.success === false) {
      result = validateResult
      ctx.body = result
      return
    }

    const existOne = await userServices.getExistOne(formData)

    if (existOne) {
      if (existOne.name === formData.name) {
        result.message = userCode.FAIL_USER_NAME_IS_EXIST
        ctx.body = result
        return
      }
      if (existOne.email === formData.email) {
        result.message = userCode.FAIL_EMAIL_IS_EXIST
        ctx.body = result
        return
      }
    }

    let userResult = await userServices.create({
      email: formData.email,
      password: formData.password,
      name: formData.name,
      nick: formData.nick,
      level: 1,
      create_time: moment(new Date().getTime()).format('YYYY-MM-DD HH:mm:ss')
    })

    if (userResult && userResult.insertId * 1 > 0) {
      result.success = true
      result.message = '注册成功'
    } else {
      result.success = false
      result.message = '注册失败'
    }

    ctx.body = result
  },

  /**
   * 用户登录
   * @param   {obejct} ctx 上下文对象
   */

  async login (ctx) {
    let formData = ctx.request.body
    let result = {
      success: false,
      message: '',
      data: null,
      code: ''
    }

    let userResult = await userServices.login(formData)

    if (userResult) {
      if (formData.username === userResult.name) {
        result.success = true
        result.message = '登录成功'
        result.data = userResult
      } else {
        result.success = false
        result.message = userCode.FAIL_USER_NAME_OR_PASSWORD_ERROR
        result.code = 'FAIL_USER_NAME_OR_PASSWORD_ERROR'
      }
    } else {
      result.success = false
      result.code = 'FAIL_USER_NO_EXIST'
      result.message = userCode.FAIL_USER_NO_EXIST
    }

    if (result.success === true) {
      let session = ctx.session
      session.isLogin = true
      session.userName = userResult.name
      session.userId = userResult.id
    }
    ctx.body = result
  },

  /**
   * 用户退出
   * @param   {obejct} ctx 上下文对象
   */

  async loginout (ctx) {
    let result = {
      success: true,
      message: '退出成功'
    }
    ctx.session = null
    ctx.body = result
  },

  /**
   * 验证登录
   * @param   {obejct} ctx 上下文对象
   */

  async isLogin (ctx, next) {
    let result = {
      success: false,
      message: '请重新登录'
    }

    if (ctx.session.isLogin && ctx.session.userName && ctx.session.userId) {
      await next()
    } else {
      ctx.body = result
    }
  }

}
