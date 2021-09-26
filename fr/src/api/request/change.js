import fmt_res from "../util/fmt_res";
import post from "../util/post";

const url = "/room/change";

export default fmt_res((h_id, r_code) => {
    return post(url, {h_id, r_code});
});