import query from '@/access/util/query';
import Hom from '@/dao/Hom';
import entity from '../../usr/entity';

export default async ( usr_id: string):Promise <Hom> => {

    const usr = await entity(usr_id);

    const uh_sql = `Select * from Hom where id = "${usr.hom_id}"`;
    return (await query<Hom>(uh_sql))[0];

}