import query from "@/access/util/query";
import Mes from "@/dto/Mes";

//find the messages of usr
export default async (usr:string):Promise<Array<Mes>> => {
    const sql = `select * from mes where target = "${usr}"`;
    
    return query<Mes>(sql).then(
        res => {
            return res
        }
    )
}