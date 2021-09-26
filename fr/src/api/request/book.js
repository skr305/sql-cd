import fmt_res from "../util/fmt_res";
import post from "../util/post";

const url = "/room/book";

export default fmt_res((usr, r_code, r_id, in_date, out_date, prc, hom_pwd, iden='[[]]') => {
    console.log(iden)
    return post(url, {usr, r_code, r_id, in_date, out_date, prc, hom_pwd, iden});
});