import dyn_qry from "@/access/util/dyn_qry";
import room from "../../room";

/**
 * add a new record with the r_id and date
 */

 const bud = async (r_id:string, date: string, init_sub = true): Promise<boolean> => {
    const max = (await room(r_id)).max;
    const rem = init_sub ? max - 1 : max;
    const sql = `insert into remain (id, _date, remain) values (?, ?, ?)`;
    const qry_data = [r_id, date, rem];
    
    return dyn_qry(sql, qry_data)
}

 export default bud;