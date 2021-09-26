import fmt_res from "../util/fmt_res";
import post from "../util/post";

const url = "/room/reg_room";
export default fmt_res((reg_room_entity) => {
    return post(url, reg_room_entity);
});