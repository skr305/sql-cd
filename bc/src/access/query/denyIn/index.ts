import dyn_qry from "@/access/util/dyn_qry"

export default async (h_id:string):Promise<boolean> => {
    const sql = "update book set state = ? where h_id = ?";
    const data = ["0", h_id];
    
    return dyn_qry(sql, data);
}