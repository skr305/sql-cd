import query from '@/access/util/query';
import RegRoom from '@/dao/RegRoom';
/** find the registed room */
export default async (reg_code:string):Promise<RegRoom> => {
    const sql = `select * from regroom where reg_code = "${reg_code}"`;
    return query<RegRoom>(sql).then(
        res => res[0]
    );
}