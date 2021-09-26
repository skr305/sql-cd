import query from "@/access/util/query";
import lock from "@/lib/lock";

/** find weather the cell is idle in the specified time */
export default async (rID:string, rCode:string, dates:Array<string>):Promise<boolean> => {
    
    // has lock in it
    if(lock.hasLockIn(rID, rCode)) {
        return false;
    }


    const getSQL = (date:string) =>  `select * from OCU where 
    r_id = "${rID}" and r_code = "${rCode}" and _date="${date}"`;
    



    for(let date of dates) {
        
        const isOCU:boolean = await query<SingleOCU>(getSQL(date))
        .then(res => res && res.length != 0);

        if(isOCU) {
            return false;
        }
    }

    return true;
}