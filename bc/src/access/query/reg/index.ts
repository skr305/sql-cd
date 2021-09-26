import RegRes from "@/dto/Res/Reg";
import entity from "../lib/usr/entity";
import dyn_qry from '@/access/util/dyn_qry';
import FailError from "@/lib/errors/fail-access";
import ID from "@/access/util/ID";

export default async (usr:string, pwd: string): Promise<RegRes> => {
    const usr_ent = await entity(usr);
    console.log(usr_ent);
    if(usr_ent) {
        return {cause: 1};
    }

    const hom_id = ID.HID();

    const sql = "insert into user (usr, pwd, avatar, hom_id) values (?,?,?,?)";
    const data = [usr, pwd, "-1", hom_id];
   
    const is_suc = await dyn_qry(sql, data);

    const addHomSql = "insert into hom (id, pwd, rem) values (?, ?, ?)";
    const homData = [hom_id, "123456", 200];
    await dyn_qry(addHomSql, homData);

    

    if(is_suc) {
        return {cause: 0};
    }

    throw new FailError("");
}