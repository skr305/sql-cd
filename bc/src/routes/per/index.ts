import * as Router from 'koa-router';
import ISDUContext from '@/types/isdu-context';
import pers_info from '@/access/query/pers_info';
import history from '@/access/query/history';
import _History from '@/dto/History';
import SecUsr from '@/dto/SecUsr';
import onRead from '@/access/query/on-read';
import Mes from '@/dto/Mes';
import mes from '@/access/query/mes';
import updateAvatar from '@/access/query/pers_info/updateAvatar';
import vali from '@/access/query/hom/vali';
import setPwd from '@/access/query/hom/setPwd';
import getHistoryByOwn from '@/access/query/history/byOwn';

const router = new Router<any, ISDUContext>();

/**
 * @param {usr}
 * @returns {SecUsr: {usr, avatar, hom_id}}
 */
router.post("/pers_info", async (ctx) => {
    const usr = ctx.json.usr;
    const UsrInfo:SecUsr = await pers_info(usr);
    ctx.body = UsrInfo;
})


/**
 * @param {usr}
 * @returns {_History}
 */
 router.post("/history", async (ctx) => {
    const usr = ctx.json.usr;
    const Historys:Array<_History> =  await history(usr);

    ctx.body = Historys;
})



/**
 * @param {usr}
 * @returns {_History}
 */
 router.post("/trade_history", async (ctx) => {
    const usr = ctx.json.usr;
    const Historys:Array<_History> =  await getHistoryByOwn(usr);

    ctx.body = Historys;
})



/**
 * @param {m_id}
 * @returns {boolean}
 */
 router.post("/on_mes", async (ctx) => {
    const m_id = ctx.json.m_id;

    ctx.body = await onRead(m_id)
})


/**
 * @param {usr}
 * @returns {Array<Mes>}
 */

router.post("/get_mes", async ctx => {
    const usr = ctx.json.usr;
    const MesList:Array<Mes> = await mes(usr);

    ctx.body = MesList;
})


/**
 * @param {usr,avatar}
 * @returns {boolean}
 */

 router.post("/update_avatar", async ctx => {
    const {usr,avatar} = ctx.json;
    ctx.body = await updateAvatar(usr, avatar);
})


/**
 * @param {usr,pwd}
 * @returns {boolean}
 */

 router.post("/vali_hom", async ctx => {
    const {usr, pwd} = ctx.json;
    ctx.body = await vali(usr, pwd);
})


/**
 * @param {hom_id,pwd}
 * @returns {boolean}
 */

 router.post("/set_homPwd", async ctx => {
    const {hom_id, new_pwd} = ctx.json;
    ctx.body = await setPwd(hom_id, new_pwd);
})





const PerRoutes = router.routes();
export default PerRoutes;