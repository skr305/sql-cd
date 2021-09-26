import Room from "@/dao/Room";
import RoomInfo from "@/dto/RoomInfo";

const trans = (dao:Room):RoomInfo => {

    let {id, hed_img, r_name, pos, itr} = dao;
    let coded_hed = hed_img?.toString("utf8");
    return {
        id,
        hed_img: coded_hed,
        r_name,
        pos,
        itr
    }
}

export default trans;