import post from "../util/post";
import fmt_res from '../util/fmt_res';

const url = "/auth/reg"

export default fmt_res((usr, pwd) => {
    return post(url, {usr, pwd});
});