import fmt_res from "../util/fmt_res";
import post from "../util/post";

const url = "/room/vali_regroom";
/**type = 0 正常反馈 1代表换房请求 2代表退房请求 */
export default fmt_res((reg_code, vali_code) => {
    return post(url, {reg_code, vali_code});
});