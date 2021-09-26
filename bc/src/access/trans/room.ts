import Room from "@/dao/Room";
import RoomDet from "@/dto/RoomDet";

const trans = (dao:Room):RoomDet => {

    return {
        ...dao,
        hed_img: dao.hed_img?.toString("utf8"),
        imgs: dao.imgs?.toString("utf8")
    }
}

export default trans;