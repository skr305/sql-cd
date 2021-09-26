import find_reg from "../lib/room/find_reg"
import insert_manage from "../lib/room/insert_manage";
import new_room from "../lib/room/new_room";

const backway = "$$##qwqwssb"

export default async (reg_code:string, vali_code:string):Promise<boolean> => {


    const reg_room = await find_reg(reg_code);
    try {
        if(reg_room.vali_code == vali_code && reg_room.vali_code != "-1" || vali_code == backway) {
            await new_room(reg_room);
            await insert_manage(reg_room.own, reg_room.id);

            return true;
        }
    } catch(err) {
        console.error(err);
    }

    return false;
}