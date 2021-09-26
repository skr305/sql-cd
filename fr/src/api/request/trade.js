import fmt_res from "../util/fmt_res";
import post from "../util/post";



const url = "/per/trade_history";
export default fmt_res((usr) => {
    return post(url, {usr});
});