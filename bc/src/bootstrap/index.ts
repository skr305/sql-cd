import './alias';
import routes from '@/routes';
import * as Koa from 'koa';
import * as Router from 'koa-router';
import ISDUContext from '@/types/isdu-context';
import koaBodyJson from '@/middleware/context/body-json';
import koaErrorsHandlder from '@/middleware/error-handler';
import koaAxios from '@/middleware/context/axios';
import koaResponse from '@/middleware/common/response';
import connection from '@/access/connection';
import lock from '@/lib/lock';

const app = (() => { 
    const app = new Koa<any, ISDUContext>();
    // 处理跨域
    app.use(async (ctx, next) => {
        ctx.set("Access-Control-Allow-Origin", "*")
        await next()
    })

    const router = new Router<any, ISDUContext>();

    //init the database
    connection.init();


    // init the lock
    
    setInterval(() => {
        lock.clear();
    }, 50000)

    router.use(koaErrorsHandlder());
    router.use(koaResponse());

    router.use(koaBodyJson());
    router.use(koaAxios());
    router.use('/api/v1', routes);

    //跨域
    app.use(async (ctx, next) => {
        ctx.set('Access-Control-Allow-Origin', [ctx.headers.origin || "*"]); 
        ctx.set('Access-Control-Allow-Headers', 'content-type');
        ctx.set('Access-Control-Allow-Methods', 'OPTIONS,GET,HEAD,PUT,POST,DELETE,PATCH')
        await next();
    });

      

    // 处理路由
    app.use(router.allowedMethods()).use(router.routes());
    app.listen(8088);
    return app;
}) ();

export default app;

