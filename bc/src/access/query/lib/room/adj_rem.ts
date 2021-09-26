/**
 * adjust the remain numbers of the room by date array
 * in one book
 */

import suc_all from "@/access/util/suc_all";
import bud from "./bud_rem";
import get_rem from "./get_rem"
import sub_rem from "./sub_rem";

export default async (r_id:string, dates:Array<string>): Promise<boolean> => {
    // the dates adjust Promise list
    const adj_list = [];
    for(let date of dates) {
        adj_list.push(adj_by_one(r_id, date));
    }

    return Promise.all(adj_list)
    .then(res => suc_all(res));
}


const adj_by_one = async (r_id:string, date: string):Promise<boolean> => {
    const entity = await get_rem(r_id, date);

    if(!entity) {
        return await(bud(r_id, date))
    }

    return await sub_rem(entity);    
}