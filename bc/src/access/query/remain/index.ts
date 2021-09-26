import getCell from "../lib/room/get-cell";
import duringDays from "@/lib/date/during-days";
import getEntireCells from "./get-entire-cells";
import idleCell from "./idle-cell";
import lock from "@/lib/lock";

export default async (r_id:string, in_date:string, out_date:string):Promise<string> => {
    /** return when no remain room */
    const NO_REMAIN = "-1";

    const cells = await getCell(r_id);

    const dates = duringDays(in_date, out_date);



    for (let cell of cells) {
        const rCodeList = getEntireCells(cell);
        
        for(let rCode of rCodeList) {
            if(await idleCell(r_id, rCode, dates) ) {
                // add the lock
                lock.addLock(r_id, rCode);
                return rCode;
            }
        }
    }

    return NO_REMAIN;
}