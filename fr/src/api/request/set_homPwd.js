import fmt_res from "../util/fmt_res";
import post from "../util/post";

const url = "/per/set_homPwd";

export default fmt_res(({new_pwd, hom_id}) => {
    return post(url, {new_pwd, hom_id});
});