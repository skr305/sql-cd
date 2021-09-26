import User from "@/dao/User";
import SecUsr from "@/dto/SecUsr";

export default (usr_ent: User):SecUsr => {
    const usr = usr_ent?.usr || "-1";
    const avatar = usr_ent?.avatar?.toString("utf8") || "-1";
    const hom_id = usr_ent?.hom_id || "-1";


    return {
        usr,
        avatar,
        hom_id
    };
}