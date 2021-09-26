import post from "../util/post";
import fmt_res from '../util/fmt_res';

const url = "/per/get_mes";

export default fmt_res((usr) => {
    return post(url, {usr});
});