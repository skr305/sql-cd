import history from "@/access/trans/history";
import query from "@/access/util/query";
import RawHistory from "@/dao/RawHistory";
import _History from "@/dto/History";

export default async (h_id:string): Promise<_History> => {
    const sql = `select * from book where h_id = "${h_id}"`;
    return query<RawHistory>(sql)
    .then((res:Array<RawHistory>) => history(res[0]))
}