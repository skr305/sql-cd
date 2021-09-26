import post from "../util/post";
import fmt_res from '../util/fmt_res';

const url = "/room/own_room";

export default fmt_res((usr) => {
    return post(url, {usr});
});