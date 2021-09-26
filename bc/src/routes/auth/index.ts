import * as Router from 'koa-router';
import ISDUContext from '@/types/isdu-context';
import auth from '@/access/query/lgn';
import reg from '@/access/query/reg';

const router = new Router<any, ISDUContext>();

/**
 * @param: usr, pwd
 * @returns boolean (登录是否成功)
 */
router.post('/lgn', async (ctx) => {
    const { usr, pwd } = ctx.json;
    ctx.body = await auth(usr,pwd);
});

/**
 * @param: usr, pwd
 * @return {cause: 0/1} (0 代表成功 1代表已经有人注册)
 */
router.post("/reg", async (ctx) => {
    const { usr, pwd } = ctx.json;
    ctx.body = await reg(usr, pwd);
})



const AuthRoutes = router.routes();
export default AuthRoutes;