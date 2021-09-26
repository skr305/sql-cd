import dyn_qry from "@/access/util/dyn_qry";

export default async(r_id:string, r_code:string, h_id:string, u_id: string, dates: Array<string>)
:Promise<boolean> =>   
{
    
    const in_OCU_SQL = "Insert into OCU (r_id, r_code, _date, h_id, usr) values (?,?,?,?,?)";

    let inOCURes = true;
    for(let date of dates){
        const in_OCU_Refs = [r_id, r_code, date, h_id, u_id]; 
        inOCURes = inOCURes && await dyn_qry(in_OCU_SQL,in_OCU_Refs);
    }

    return inOCURes;
}