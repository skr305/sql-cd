import fmt_res from "../util/fmt_res";
import post from "../util/post";
import add_discount from '../util/pre/add_discount';

const url = "/room/add_discount";


/**type = 0 正常反馈 1代表换房请求 2代表退房请求 */
export default fmt_res(({r_id, d_name, d_id, extent}) => {
    return post(url, {r_id, d_name, d_id, extent});
}, add_discount);