import dyn_qry from "@/access/util/dyn_qry";
import Remain from "@/dao/Remain";
import UnknownError from "@/lib/errors/unknown";

/**
 * add a new record with the r_id and date
 */

 const bud = async (rem: Remain): Promise<boolean> => {
    if(rem.remain -1 >= 0) {
        const sql = "update `remain` set `rem` = ? where `id` = ?";
        const qry_data = [rem.remain -1, rem.id];
    
        return dyn_qry(sql, qry_data)        
    }

    throw new UnknownError("Not Remain");

    
}

 export default bud;