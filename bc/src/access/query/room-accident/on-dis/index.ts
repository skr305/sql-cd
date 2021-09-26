import dyn_qry from "@/access/util/dyn_qry";
import deleteOCU from "../util/deleteOCU";

export default async (h_id:string) => {
    /** the state of the disroom */
    const DIS_STATE = "5";
    const updateHistorySQL  = `update book set state = "${DIS_STATE}" where h_id = ?`
    const updateHistoryRefs = [h_id];

    const updateResult = await dyn_qry(updateHistorySQL, updateHistoryRefs);

    const deleteResult = await deleteOCU(h_id);

    return updateResult && deleteResult;
}