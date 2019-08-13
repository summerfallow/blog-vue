const blogServices = require('../services/blog')
const { uploadFiles } = require('../utils/upload')
const path = require('path')
const moment = require('moment')

module.exports = {
  /**
   * 文章新增
   * @param   {obejct} ctx 上下文对象
   */

  async Add (ctx) {
    let formData = ctx.request.body
    let result = {
      success: false,
      message: '',
      data: null
    }

    let blogResult = await blogServices.create({
      title: formData.title,
      content: formData.content,
      type: formData.type,
      create_time: moment(new Date().getTime()).format('YYYY-MM-DD HH:mm:ss'),
      modified_time: moment(new Date().getTime()).format('YYYY-MM-DD HH:mm:ss'),
      author: formData.author,
      author_id: formData.authorId,
      pv: 0
    })

    if (blogResult && blogResult.insertId * 1 > 0) {
      result.success = true
      result.message = '添加成功'
    } else {
      result.success = false
      result.message = '添加失败'
    }

    ctx.body = result
  },

  /**
   * 文章修改
   * @param   {obejct} ctx 上下文对象
   */

  async Edit (ctx) {
    let formData = ctx.request.body
    let result = {
      success: false,
      message: '',
      data: null
    }

    let blogResult = await blogServices.edit({
      title: formData.title,
      content: formData.content,
      type: formData.type,
      modified_time: moment(new Date().getTime()).format('YYYY-MM-DD HH:mm:ss')
    }, formData.id)

    if (blogResult) {
      result.success = true
      result.message = '编辑成功'
    } else {
      result.success = false
      result.message = '编辑失败'
    }

    ctx.body = result
  },

  /**
   * 文章删除
   * @param   {obejct} ctx 上下文对象
   */

  async Delete (ctx) {
    let formData = ctx.request.query
    let result = {
      success: false,
      message: ''
    }

    let blogResult = await blogServices.delete(formData.id)

    if (blogResult) {
      result.success = true
      result.message = '删除成功'
    } else {
      result.success = false
      result.message = '删除失败'
    }

    ctx.body = result
  },

  /**
   * 文章查看
   * @param   {obejct} ctx 上下文对象
   */

  async Detail (ctx) {
    let formData = ctx.request.query
    let result = {
      success: false,
      message: '',
      data: {}
    }

    let blogResult = await blogServices.detail(formData.id)

    if (blogResult.length) {
      await blogServices.edit({
        pv: blogResult[0].pv + 1
      }, blogResult[0].id)
      result.success = true
      result.data = blogResult[0]
    } else {
      result.success = false
      result.message = '读取失败'
    }

    ctx.body = result
  },

  /**
   * 文章列表
   * @param   {obejct} ctx 上下文对象
   */

  async List (ctx) {
    let formData = ctx.request.query
    let result = {
      success: false,
      message: '',
      data: {}
    }

    const current = formData.current || 1
    const pageSize = formData.pageSize || 10

    let blogResult = await blogServices.list({
      type: formData.type || '',
      title: formData.title || '',
      content: formData.content || '',
      create_time: formData.create || ''
    }, (current - 1) * pageSize, pageSize)

    if (blogResult) {
      result.success = true
      result.data = blogResult.data
      result.total = blogResult.total
      result.pageSize = pageSize
      result.current = current
    } else {
      result.success = false
      result.message = '读取列表失败'
    }

    ctx.body = result
  },

  /**
   * 文章类型新增
   * @param   {obejct} ctx 上下文对象
   */

  async TypeAdd (ctx) {
    let formData = ctx.request.body
    let result = {
      success: false,
      message: '',
      data: null
    }
    formData['author_id'] = ctx.session.userId

    const existOne = await blogServices.getExistOne(formData)

    if (existOne) {
      result.success = false
      result.message = '类别已存在，请重新输入'
      ctx.body = result
      return
    }

    let blogResult = await blogServices.createType({
      type: formData.type,
      author_id: formData.author_id
    })

    if (blogResult && blogResult.insertId * 1 > 0) {
      result.success = true
      result.message = '添加成功'
    } else {
      result.success = false
      result.message = '添加失败'
    }

    ctx.body = result
  },

  /**
   * 文章类型列表
   * @param   {obejct} ctx 上下文对象
   */

  async TypeList (ctx) {
    let formData = ctx.request.body
    let result = {
      success: false,
      message: '',
      data: []
    }

    let blogResult = await blogServices.typeList(ctx.session.userId)

    if (blogResult) {
      result.success = true
      result.message = '获取成功'
      result.data = blogResult
    } else {
      result.success = false
      result.message = '获取失败'
    }

    ctx.body = result
  },

  /**
   * 文章类型删除
   * @param   {obejct} ctx 上下文对象
   */

  async TypeDel (ctx) {
    let formData = ctx.request.query
    let result = {
      success: false,
      message: ''
    }

    let blogResult = await blogServices.typeDel(formData.id)

    if (blogResult) {
      result.success = true
      result.message = '删除成功'
    } else {
      result.success = false
      result.message = '删除失败'
    }

    ctx.body = result
  },

  /**
   * 文件上传
   * @param   {obejct} ctx 上下文对象
   */

  async UploadFile (ctx) {
    // 上传文件请求处理
    let result = { success: false }
    let serverFilePath = path.join( __dirname, '../upload-file' )

    // 上传文件事件
    result = await uploadFiles( ctx, {
      fileType: 'album',
      path: serverFilePath
    })
    ctx.body = result
  }

}
