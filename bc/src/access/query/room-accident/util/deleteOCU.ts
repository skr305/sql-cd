import dyn_qry from "@/access/util/dyn_qry";

export default async (h_id:string) => {
    /** delete from the OCU */
    const deleteOCU = `delete from OCU where h_id = ?`;
    const deleteRefs = [h_id];

    return dyn_qry(deleteOCU, deleteRefs);
}