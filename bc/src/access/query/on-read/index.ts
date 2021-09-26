import dyn_qry from "@/access/util/dyn_qry";

export default async (m_id:string):Promise<boolean> => {
    
    const READED = 1; 
    const sql = `update mes set has_read = "${READED}" where m_id = ?`
    const data = [m_id];

    return dyn_qry(sql, data);
}