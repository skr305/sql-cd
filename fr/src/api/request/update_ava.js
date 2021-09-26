import fmt_res from "../util/fmt_res";
import post from "../util/post";

const url = "/per/update_avatar";

export default fmt_res((usr, avatar) => {
    return post(url, {usr, avatar});
});