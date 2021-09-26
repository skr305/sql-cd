import query from "@/access/util/query"
import Manage from "@/dao/Manage"
import OwnRoom from '@/dto/OwnRoom';
import RoomDet from "@/dto/RoomDet";
import room from "../room";

const trans = (room:RoomDet):OwnRoom => {
    const {id, r_name, pos, prc, hed_img} = room;
    return {id, r_name, pos, prc, hed_img};
}

export default async (usr:string):Promise<Array<OwnRoom>> => {
    const manages:Array<Manage> = await query<Manage>
    (`select * from manage where u_id = "${usr}"`);

    const result = [];

    for(let m_room of manages) {
        const roomInfo = await room(m_room.r_id);

        roomInfo ? result.push(trans(roomInfo)) : "";
    }

    return result;

    
}