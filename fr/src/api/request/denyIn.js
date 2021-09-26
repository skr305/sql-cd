import fmt_res from "../util/fmt_res";
import post from "../util/post";

const url = "/room/deny_in";

export default fmt_res((h_id) => {
    return post(url, {h_id});
});