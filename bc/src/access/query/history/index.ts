import history from "@/access/trans/history";
import query from "@/access/util/query";
import RawHistory from "@/dao/RawHistory";
import _History from "@/dto/History";

export default async (usr:string): Promise<Array<_History>> => {
    const sql = `select * from book where u_id = "${usr}"`;
    return query<RawHistory>(sql)
    .then((res:Array<RawHistory>) => res.map(his => history(his)))
}