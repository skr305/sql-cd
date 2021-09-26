import Discount from '@/dao/Discount';
import query from '@/access/util/query';

export default async ( r_id: string ):Promise <Array<Discount>> => {

    const sql = `select * from discount where r_id = "${r_id}"`;

    return query<Discount>(sql);

}