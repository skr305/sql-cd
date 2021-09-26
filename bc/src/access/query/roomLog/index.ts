import query from "@/access/util/query";
import RawHistory from "@/dao/RawHistory";
import _History from "@/dto/History";
import RoomLog from "@/dto/RoomLog";
import history_trans from "@/access/trans/history";

export default async (id:string):Promise<RoomLog> => {
    const findRecordSql = `select * from book where r_id = "${id}"`;

    const records:Array<_History> =  await query<RawHistory>(findRecordSql)
    .then((res:Array<RawHistory>) => res.map(his => history_trans(his)));

    //订单总数
    let totalCnt = records.length;
    //产生的收益
    let totalBen = 0;

    for(let i=0; i<totalCnt; i++) {
        totalBen += Number(records[i].prc);
    }

    return {
        totalBen,
        totalCnt
    }
}