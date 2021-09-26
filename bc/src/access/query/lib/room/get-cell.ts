/** get all the cell of the specified room id */

import query from "@/access/util/query";
import Cell from "@/dto/Cell"

export default async (r_id:string):Promise<Array<Cell>> => {
    const sql = `select * from cell where r_id = "${r_id}"`;

    return query<Cell>(sql);
}