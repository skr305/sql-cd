import history from "@/access/trans/history";
import query from "@/access/util/query";
import RawHistory from "@/dao/RawHistory";
import _History from "@/dto/History";
import get_own from "../lib/usr/own";

export default async (r_id:string): Promise<Array<_History>> => {



    const sql = `select * from book where r_id = "${r_id}"`;
    return query<RawHistory>(sql)
    .then((res:Array<RawHistory>) => res.map(his => history(his)))
}