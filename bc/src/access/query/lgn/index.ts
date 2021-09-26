import User from '@/dao/User';
import entity from '../lib/usr/entity';

export default async ( usr: string, pwd: string ):Promise <boolean> => {

    const usr_ent:User = await entity(usr);
    if(!usr_ent) {
        return false
    }
    return usr_ent.pwd == pwd
}