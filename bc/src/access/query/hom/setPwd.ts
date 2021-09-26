import dyn_qry from "@/access/util/dyn_qry";

export default async (id:string, new_pwd: string):Promise<boolean> => {
    const avatarSql = "update hom set pwd = ? where id = ?";

    // console.log("in", [avatar]);
    return dyn_qry(avatarSql, [new_pwd, id]);
}