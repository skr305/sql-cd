import dyn_qry from "@/access/util/dyn_qry";
import Room from "@/dao/Room";
import log from '@/lib/log';

export default async (room:Room):Promise<boolean> => {
    //generate the room
    const generateRoom = `insert into room (id, hed_img, imgs, r_name, itr, ins, ser, own, prc, pos, max)
     values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

     const room_data = [room.id, room.hed_img, room.imgs, room.r_name, room.itr, room.ins,
    room.ser, room.own, room.prc, room.pos, room.max];

    return dyn_qry(generateRoom, room_data);
}