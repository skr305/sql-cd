import post from "../util/post";
import fmt_res from '../util/fmt_res';

const url = "/room/month_ocu_situ";

export default fmt_res((r_id) => {
    return post(url, {r_id});
});