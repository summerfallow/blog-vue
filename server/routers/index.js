const router = require('koa-router')()

const user = require('./user')
const blog = require('./blog')

router.use('/wzq/user', user.routes(), user.allowedMethods())
router.use('/wzq/blog', blog.routes(), blog.allowedMethods())

module.exports = router
