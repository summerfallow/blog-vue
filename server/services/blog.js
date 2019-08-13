const blogModal = require('../models/blog');

const blog = {
  /**
   * 新建文章
   * @param  {object} blog 文章内容
   * @return {object}      创建结果
   */
  async create( blog ) {
    let result = await blogModal.create(blog);
    return result;
  },

  /**
   * 修改文章
   * @param  {object} blog 文章内容
   * @return {object}      创建结果
   */
  async edit( blog, id ) {
    let result = await blogModal.edit(blog, id);
    return result;
  },

  /**
   * 删除文章
   * @param  {object} blog 文章删除
   * @return {object}      创建结果
   */
  async delete( id ) {
    let result = await blogModal.delete(id);
    return result;
  },

  /**
   * 查看文章
   * @param  {object} blog 文章查看
   * @return {object}      创建结果
   */
  async detail( id ) {
    let result = await blogModal.detail(id);
    return result;
  },

  /**
   * 文章列表
   * @param  {object} blog 文章列表
   * @return {object}      创建结果
   */
  async list( blog, start, end ) {
    let result = await blogModal.list(blog, start, end);
    return result;
  },

  /**
   * 新建文章类型
   * @param  {object} blog 文章类型
   * @return {object}      创建结果
   */
  async createType( type ) {
    let result = await blogModal.createType(type);
    return result;
  },

  /**
   * 文章类型删除
   * @param  {object} blog 文章类型
   * @return {object}      创建结果
   */
  async typeDel( id ) {
    let result = await blogModal.delType(id);
    return result;
  },

  /**
   * 查找文章类别信息
   * @param  {object} formData 查找的表单数据
   * @return {object|null}      查找结果
   */
  async getExistOne( formData ) {
    let resultData = await blogModal.getExistOne({
      'type': formData.type,
      'author_id': formData.author_id
    });
    return resultData;
  },

  /**
   * 文章类别列表
   * @param  {object} blog 文章类型列表
   * @return {object}      创建结果
   */
  async typeList( id ) {
    let result = await blogModal.typeList(id);
    return result;
  },

};

module.exports = blog;
