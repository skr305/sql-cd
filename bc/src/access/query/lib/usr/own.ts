import User from "@/dao/User";
import query from "@/access/util/query";
import Manage from "@/dao/Manage";
import entity from "./entity";

/**
 * get the owner of the room
 */
const get_own = async (r_id:string):Promise<User> => {
    const sql = `Select * from manage where r_id = "${r_id}"`;

    const own_id = (await query<Manage>(sql))[0].u_id;

    return entity(own_id);
}


export default get_own;