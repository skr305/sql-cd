import post from "../util/post";
import fmt_res from '../util/fmt_res';
import pre from '../util/pre/lgn';

const url = "/auth/lgn"

export default fmt_res((usr, pwd) => {
    return post(url, {usr, pwd});
}, pre);