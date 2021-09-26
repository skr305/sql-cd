import * as Router from 'koa-router';
import ISDUContext from '@/types/isdu-context';
import room from '@/access/query/room';
import rec from '@/access/query/rec';
import book from '@/access/query/book';
import duringDays from '@/lib/date/during-days';
import remain from '@/access/query/remain';
import fed from '@/access/query/fed';
import RawRegRoom from '@/dto/RawRegRoom';
import regroom from '@/access/query/regroom';
import vali_regroom from '@/access/query/vali_regroom';
import situation from '@/access/query/remain/situation';
import denyIn from '@/access/query/denyIn';
import roomOcuSitu from '@/access/query/roomOcuSitu';
import ownRoom from '@/access/query/ownRoom';
import roomLog from '@/access/query/roomLog';
import onChange from '@/access/query/room-accident/on-change';
import getDiscount from '@/access/query/discount/getAll';
import dropDiscount from '@/access/query/discount/drop';
import addDiscount from '@/access/query/discount/add';
import Discount from '@/dao/Discount';
import _History from '@/dto/History';

const router = new Router<any, ISDUContext>();
/**
 * @param r_id
 * @returns {RoomDet}
 */
router.post('/det', async (ctx) => {
    const r_id = ctx.json.r_id;
    ctx.body = await room(r_id);

    // console.log(ctx.body);
});



/**
 * @param {usr}
 * @returns {Array<RoomInfo>}}
 */

router.post('/rec', async (ctx) => {
  // const usr = ctx.json.usr;
  ctx.body = await rec();
});

/**
 * @param {usr, r_code, r_id, in_date, out_date, prc, hom_pwd, iden}
 * @returns {string: 0代表成功 1代表没有足够余额 2代表此房间已被占用 3代表此用户没有开户
 *  5代表未定义的错误}
 */

router.post('/book', async (ctx) => {
  // const usr = ctx.json.usr;
  const {usr, r_code, r_id, in_date, out_date, prc, hom_pwd, iden} = ctx.json;
  const date_arr = duringDays(in_date, out_date);
  ctx.body = await book(usr, r_id, r_code)(date_arr, prc, hom_pwd, iden);
});

/**
 * @param {r_id, in_date, out_date}
 * @returns {string: 如果是-1 则意为没有余房 如果是其它的 则代表空闲房R_CODE}
 */
router.post('/has_remain', async (ctx) => {
  const {r_id, in_date, out_date} = ctx.json;
  ctx.body = await remain(r_id, in_date, out_date);
})


/**
 * 包含feedback change_room disroom
 * @param {h_id, content, type}
 * @returns {boolean 成功或失败}
 * //这种类型的其实看ErrorCode就行了
 */

router.post('/fed', async (ctx) => {
  const {h_id, content, type} = ctx.json  
  ctx.body = await fed({h_id, content, type})
})


/**
 * @param {RawRegRoom}
 * @returns {string: vali_code} 
 */

router.post('/reg_room', async (ctx) => {
  const roomEnt:RawRegRoom = ctx.json
  ctx.body = await regroom(roomEnt);
})


/**
 * @param {h_id, r_code}
 * @returns {boolean} 
 */

 router.post('/change', async (ctx) => {
  const {h_id, r_code} = ctx.json
  ctx.body = await onChange(h_id, r_code);
})


/**
 * @param {reg_code, vali_code}
 * @returns {boolean}
 */

router.post('/vali_regroom', async (ctx) => {
  const {reg_code, vali_code} = ctx.json;
  ctx.body = await vali_regroom(reg_code, vali_code);
})

/**
 * @param {r_id, in_date, out_date}
 * @returns { OCUSituation }
 * 
 */

router.post('/ocu_situ', async ctx => {
  const {r_id, in_date, out_date} = ctx.json;
  ctx.body = await situation(r_id, in_date, out_date);
})



/**
 * @param {h_id}
 * @returns { boolean }
 * 
 */

 router.post('/deny_in', async ctx => {
  const {h_id} = ctx.json;
  ctx.body = await denyIn(h_id);
})




/**
 * @param {r_id}
 * @returns { Array<Number> }
 * 
 */

 router.post('/ocu_situ', async ctx => {
  const {r_id} = ctx.json;
  ctx.body = await roomOcuSitu(r_id);
})



/**
 * @param {r_id}
 * @returns { RoomLog }
 * 
 */

 router.post('/room_log', async ctx => {
  const {r_id} = ctx.json;
  ctx.body = await roomLog(r_id);
})


/**
 * @param {r_id}
 * @returns { RoomLog }
 * 
 */

 router.post('/month_ocu_situ', async ctx => {
  const {r_id} = ctx.json;
  ctx.body = await roomOcuSitu(r_id);
})


/**
 * @param {usr}
 * @returns { Array<OwnRoom> }
 * 
 */

 router.post('/own_room', async ctx => {
  const {usr} = ctx.json;
  ctx.body = await ownRoom(usr);
})



/**
 * @param {r_id}
 * @returns { Array<Discount> }
 * 
 */

 router.post('/get_discount', async ctx => {
  const {r_id} = ctx.json;
  ctx.body = await getDiscount(r_id);
})


/**
 * @param {d_id}
 * @returns {boolean }
 * 
 */

 router.post('/drop_discount', async ctx => {
  const {d_id} = ctx.json;
  ctx.body = await dropDiscount(d_id);
})


/**
 * @param {Discount}
 * @returns { boolean }
 * 
 */

 router.post('/add_discount', async ctx => {
  const discount:Discount = ctx.json;
  ctx.body = await addDiscount(discount);
})











const RoomRoutes = router.routes();
export default RoomRoutes;
