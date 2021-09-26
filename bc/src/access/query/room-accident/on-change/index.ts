import dyn_qry from "@/access/util/dyn_qry";
import _History from "@/dto/History";
import duringDays from "@/lib/date/during-days";
import FailError from "@/lib/errors/fail-access";
import getHistory from "../../history/byId";
import idleCell from "../../remain/idle-cell"
import addOCU from "../util/addOCU";
import deleteOCU from "../util/deleteOCU";

export default async (h_id:string, rCode: string):Promise<boolean> => {
    const history:_History = await getHistory(h_id);
    
    const r_id = history.r_id;
    const datesArr = duringDays(history.in_date, history.out_date);
    
    if(!idleCell(r_id, rCode, datesArr)) {
        throw new FailError("not a idle cell");
    }   

    /** delete from the OCU */
    const deleteRes = await deleteOCU(h_id);


    const inOCURes = await addOCU(r_id, rCode, h_id, history.u_id, datesArr);
    
    /** history update */
    const updateHistory = "update book set r_code=? where h_id=?";

    const updateRefs  = [rCode,h_id];

    const updateRes = await dyn_qry(updateHistory, updateRefs);


    return deleteRes && updateRes && inOCURes;

}