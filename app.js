import Koa from 'koa';
import path from 'path'
import Pug from 'koa-pug';
import router from './routes';
import convert from 'koa-convert';
import staticCache from 'koa-static-cache';

const app = new Koa();

const isDev = process.env.NODE_ENV === 'development';


app.use(convert(staticCache(path.join(__dirname, './dist'), {
  maxAge: 365 * 24 * 60 * 60,
  dynamic: isDev
})));



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