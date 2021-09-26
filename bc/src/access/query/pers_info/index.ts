import entity from '../lib/usr/entity';
import SecUsr from '@/dto/SecUsr';
import User from '@/dao/User';
import secUser from '@/access/trans/secUser';

export default async ( usr: string ):Promise <SecUsr> => {

    const usr_ent:User = await entity(usr);
    console.log(usr_ent.avatar);
    return secUser(usr_ent);
}