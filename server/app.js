const Koa = require('koa');
const open = require('open');
const convert = require('koa-convert');
const bodyParser = require('koa-bodyparser');
const koaLogger = require('koa-logger');
const jsonp = require('koa-jsonp');
const session = require('koa-session-minimal');
const MysqlStore = require('koa-mysql-session');

const config = require('../config');
const routers = require('./routers/index');

const app = new Koa();

// session存储配置
const sessionMysqlConfig= {
  user: config.database.USERNAME,
  password: config.database.PASSWORD,
  database: config.database.DATABASE,
  host: config.database.HOST,
};

// 配置session中间件
app.use(session({
  key: 'BLOG_SID',
  store: new MysqlStore(sessionMysqlConfig),
}));

// 配置控制台日志中间件
app.use(koaLogger());

// 配置ctx.body解析中间件
app.use(bodyParser());
app.use(jsonp());

// app.use(ctx => {
//   ctx.body = '<form action="/blog/add.do" method="post"><input type="text" name="title" /><input type="text" name="content" /><input type="text" name="pv" /><input type="submit" value="Submit" /></form>';
// });

// 初始化路由中间件
app.use(routers.routes()).use(routers.allowedMethods());

app.listen(config.port);
// open('http://localhost:2001');
