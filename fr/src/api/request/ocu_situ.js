import post from "../util/post";
import fmt_res from '../util/fmt_res';

const url = "/room/ocu_situ";

export default fmt_res(({r_id, in_date, out_date}) => {
    return post(url, {r_id, in_date, out_date});
});