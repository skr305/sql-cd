import post from "../util/post";
import fmt_res from '../util/fmt_res';

const url = "/per/on_mes";

export default fmt_res((m_id) => {
    return post(url, {m_id});
});