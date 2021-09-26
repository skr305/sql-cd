import fmt_res from "../util/fmt_res";
import post from "../util/post";



const url = "/per/history";
/**type = 0 正常反馈 1代表换房请求 2代表退房请求 */
export default fmt_res((usr) => {
    return post(url, {usr});
});