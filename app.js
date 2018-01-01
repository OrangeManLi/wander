import Koa from 'koa';
import Pug from 'koa-pug';

const app = new Koa();

const isDev = process.env.NODE_ENV === 'development';

// views
new Pug({ // eslint-disable-line no-new
  viewPath: './views',
  debug: isDev,
  pretty: isDev,
  noCache: isDev,
  compileDebug: isDev,
  helperPath: [
    { _: require('lodash') }
  ],
  app: app
});

app.use(async ctx => {
  ctx.body = 'Hello World';
});

app.listen(7878);