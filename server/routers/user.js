const router = require('koa-router')();
const userControllers = require('../controllers/user')

const routers = router.post('/register.do', userControllers.register)
  .post('/login.do', userControllers.login)
  .get('/loginout.do', userControllers.loginout)

module.exports = routers
