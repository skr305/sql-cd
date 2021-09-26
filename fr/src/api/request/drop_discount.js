import fmt_res from "../util/fmt_res";
import post from "../util/post";
import drop_discount from '../util/pre/drop_discount';

const url = "/room/drop_discount";
/**type = 0 正常反馈 1代表换房请求 2代表退房请求 */
export default fmt_res((d_id) => {
    return post(url, {d_id});
}, drop_discount);