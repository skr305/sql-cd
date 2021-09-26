import fmt_res from "../util/fmt_res";
import post from "../util/post";

const url = "/room/has_remain";

export default fmt_res((r_id, in_date, out_date) => {
    return post(url, {r_id, in_date, out_date});
});