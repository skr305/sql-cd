import koaBody = require('koa-body');
import * as koaCompose from 'koa-compose';
import koaJson from './json';

function koaBodyJson() {
  return koaCompose([koaBody(), koaJson()]);
}

export default koaBodyJson;
