import dyn_qry from "@/access/util/dyn_qry";


export default async ( d_id: string ):Promise <boolean> => {
    /** delete from the OCU */
    const deleteDis= `delete from discount where d_id = ?`;
    const deleteRefs = [d_id];

    return dyn_qry(deleteDis, deleteRefs);
}