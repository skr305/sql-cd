import Manage from "@/dao/Manage";
import query from "@/access/util/query";
import _History from "@/dto/History";

import byRid from "./byRid";

export default async (usr:string): Promise<Array<_History>> => {
    
    const manages:Array<Manage> = await query<Manage>
    (`select * from manage where u_id = "${usr}"`);

    console.log(manages)
    let result:Array<_History> = [];

    for(let roomRec of manages) {
        // console.log(roomRec,roomRec.r_id, await byRid(roomRec.r_id))
        result = result.concat((await byRid(roomRec.r_id)));
    }


    return result;
}