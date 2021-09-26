import dyn_qry from '@/access/util/dyn_qry';
import ID from '@/access/util/ID';
import Discount from '@/dao/Discount';
export default async (discount: Discount):Promise<string> => {
    
    const sql = "insert into discount (r_id, extent, d_name, d_id) values (?, ?, ?, ?)"
    const d_id = ID.DID();
    
    const data = [discount.r_id, discount.extent, discount.d_name, d_id];
    await dyn_qry(sql, data);

    return d_id;
}