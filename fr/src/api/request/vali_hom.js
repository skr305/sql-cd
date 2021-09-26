import fmt_res from "../util/fmt_res";
import post from "../util/post";

const url = "/per/vali_hom";

export default fmt_res(({usr, pwd}) => {
    return post(url, {usr, pwd});
});