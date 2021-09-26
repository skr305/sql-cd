import getCell from "../lib/room/get-cell";
import duringDays from "@/lib/date/during-days";
import getEntireCells from "./get-entire-cells";
import idleCell from "./idle-cell";
import OCUSituation from "@/dto/OCUSituation";

/** get the entire situation of the ocu of the rooms */
export default async (r_id:string, in_date:string, out_date:string):Promise<OCUSituation> => {
    const ocuSituation:OCUSituation = {};

    const cells = await getCell(r_id);

    const dates = duringDays(in_date, out_date);



    for (let cell of cells) {
        const rCodeList = getEntireCells(cell);
        ocuSituation[cell.head] = []
        for(let rCode of rCodeList) {
            
            // if it's ocupied, will be signed with 1, othewise 0
            const singleRoomOCU = (await idleCell(r_id, rCode, dates)) ? 0 : 1;
            
            ocuSituation[cell.head].push(singleRoomOCU);
        }
    }

    return ocuSituation;
}