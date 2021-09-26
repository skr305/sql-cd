import post from "../util/post";
import fmt_res from '../util/fmt_res';
import pre from '../util/pre/pay';

const url = "/auth/pay"

export default fmt_res((usr_id, tgt_id, pwd, number) => {
    return post(url, {usr_id, tgt_id, pwd, number});
}, pre);