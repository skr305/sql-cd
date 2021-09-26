/** get all the cell of the specified room id */

import dyn_qry from "@/access/util/dyn_qry";

export default async ( u_id:string, r_id:string):Promise<boolean> => {
    const sql = `insert into manage (u_id, r_id) values (?, ?)`;
    const data = [u_id, r_id]
    return dyn_qry(sql, data);
}