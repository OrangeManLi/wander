require('babel-core/register')({
  presets: ['es2015', 'stage-3']
});
require('babel-polyfill');
require('./app');
