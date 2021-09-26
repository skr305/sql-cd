import dyn_qry from '@/access/util/dyn_qry';
import find_hom from './find_hom';


/**
 * put in the money in specified quantity
 * return the total money after put-in if success
 * 
 */
export default async ( tgt_id: string, num: number ):Promise <number> => {
    try {
        const tgt_hom = await find_hom(tgt_id);
        console.log(num, tgt_hom.rem);
        const total:number = Number(tgt_hom.rem) + Number(num);

        const pi_sql = "update `hom` set `rem` = ? where `id` = ?";
        const pi_qry_data = [total, tgt_hom.id];

        await dyn_qry(pi_sql, pi_qry_data);

        return total;
        
    } catch (error) {
        return -1;
    }
}