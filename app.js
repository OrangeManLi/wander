import Koa from 'koa';
import Pug from 'koa-pug';
import router from './routes';

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


app.use(router.routes())
  .use(router.allowedMethods());
app.listen(7878);