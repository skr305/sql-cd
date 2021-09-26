import dyn_qry from "@/access/util/dyn_qry";
import ID from "@/access/util/ID";

/**
 * add a new book history 
 */

 const bud = async (r_id:string, r_code:string, u_id:string, raw_dates: Array<string>, prc:number,  iden='[["车智澈", "350121200112310032"]]', state="1"): Promise<boolean> => {
    const h_id = ID.HID();
    
    const sql = `insert into book (r_id, r_code, u_id, dates, prc, state, h_id, iden) values (?, ?, ?, ?, ?, ?, ?, ?)`;
    const dates = [raw_dates[0], raw_dates[raw_dates.length-1]].join("|");
    const qry_data = [r_id, r_code, u_id, dates, prc, state, h_id, iden];
    
    return dyn_qry(sql, qry_data)
}

 export default bud;