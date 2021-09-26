import post from "../util/post";
import fmt_res from '../util/fmt_res';
import pre from '../util/pre/rec';

const url = "/room/rec";

export default fmt_res((usr) => {
    return post(url, {usr});
}, pre);