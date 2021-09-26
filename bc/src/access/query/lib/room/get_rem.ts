import Remain from "@/dao/Remain";
import query from "@/access/util/query";

/**
 * get the entity of the Remain with the id
 */
const get_rem = async (r_id:string, date: string):Promise<Remain|null> => {
    const sql = `Select * from Remain where id = "${r_id}" and _date = "${date}"`;

    return query<Remain>(sql)
    .then(
        res => {
            if(res) {
                if(res.length != 0) {
                    return res[0]
                }
                
            }

            return null;
        }
    );
}


export default get_rem;