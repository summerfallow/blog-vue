const router = require('koa-router')();
const userControllers = require('../controllers/user');
const blogControllers = require('../controllers/blog');

const routers = router.post('/add.do', userControllers.isLogin, blogControllers.Add)
  .post('/edit.do', userControllers.isLogin, blogControllers.Edit)
  .get('/delete.do', userControllers.isLogin, blogControllers.Delete)
  .get('/detail.do', blogControllers.Detail)
  .get('/list.do', blogControllers.List)
  .get('/archives.do', blogControllers.Archives)
  .get('/archivesYear.do', blogControllers.ArchivesYear)
  .post('/typeAdd.do', userControllers.isLogin, blogControllers.TypeAdd)
  .get('/typeList.do', blogControllers.TypeList)
  .get('/typeDel.do', userControllers.isLogin, blogControllers.TypeDel)
  .post('/upload-file.do', blogControllers.UploadFile);

module.exports = routers;
