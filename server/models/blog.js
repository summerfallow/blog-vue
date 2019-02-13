const dbUtils = require('../utils/db-util');

const blog = {
  /**
   * 数据库新建文章
   * @param  {object} model 博客数据模型
   * @return {object}       mysql执行结果
   */
  async create ( model ) {
    let result = await dbUtils.insertData( 'blog', model );
    return result;
  },

  /**
   * 数据库修改文章
   * @param  {object} model 博客数据模型
   * @return {object}       mysql执行结果
   */
  async edit ( model, id ) {
    let result = await dbUtils.updateData( 'blog', model, id );
    return result;
  },

  /**
   * 数据库删除文章
   * @param  {object} model 博客数据模型
   * @return {object}       mysql执行结果
   */
  async delete ( id ) {
    let result = await dbUtils.deleteDataById( 'blog', id );
    return result;
  },

  /**
   * 数据库查看文章
   * @param  {object} model 博客数据模型
   * @return {object}       mysql执行结果
   */
  async detail ( id ) {
    let result = await dbUtils.findDataById( 'blog', id );
    return result;
  },

  /**
   * 数据库文章列表
   * @param  {object} model 博客数据模型
   * @return {object}       mysql执行结果
   */
  async list ( blog, start, end ) {
    let data = await dbUtils.findBlogListDataByPage( 'blog', blog, start, end );
    let total = await dbUtils.findBlogListDataCount( 'blog', blog );
    const result = {
      data,
      total: total[0].total_count,
    };
    return result;
  },

  /**
   * 数据库新建文章类型
   * @param  {object} model 博客数据模型
   * @return {object}       mysql执行结果
   */
  async createType ( type ) {
    let result = await dbUtils.insertData( 'blog_type', type );
    return result;
  },

  /**
   * 查找一个存在类别的数据
   * @param  {obejct} options 查找条件参数
   * @return {object|null}        查找结果
   */
  async getExistOne(options) {
    let _sql = `
    SELECT * from blog_type
      where type="${options.type}" and author_id="${options.author_id}"
      limit 1`;
    let result = await dbUtils.query( _sql );
    if ( Array.isArray(result) && result.length > 0 ) {
      result = result[0];
    } else {
      result = null;
    }
    return result;
  },

  /**
   * 数据库文章类别列表
   * @param  {object} model 博客数据模型
   * @return {object}       mysql执行结果
   */
  async typeList ( id ) {
    let result = await dbUtils.findDataByTypeList( 'blog_type', id );
    return result;
  },

};

module.exports = blog;
