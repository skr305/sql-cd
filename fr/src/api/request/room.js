import fmt_res from "../util/fmt_res";
import post from "../util/post";
import pre from '../util/pre/room';

const url = "/room/det";

export default fmt_res((id) => {
    return post(url, {r_id:id});
}, pre);