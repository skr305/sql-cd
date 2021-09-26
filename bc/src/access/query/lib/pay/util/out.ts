import dyn_qry from '@/access/util/dyn_qry';
import find_hom from './find_hom';


/**
 * get out the money in specified quantity
 * return the total money after put-in if success
 * 
 */
export default async ( usr_id: string, num: number ):Promise <number> => {
    try {
        const usr_hom = await find_hom(usr_id);
        const total = usr_hom.rem - num;

        console.log(usr_id, num);
        const pi_sql = "update `hom` set `rem` = ? where `id` = ?";
        const pi_qry_data = [total, usr_hom.id];

        await dyn_qry(pi_sql, pi_qry_data);

        return total;
        
    } catch (error) {
        return -1;
    }
}