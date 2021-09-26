import dyn_qry from "@/access/util/dyn_qry";

export default async (usr:string, avatar:string):Promise<boolean> => {
    const avatarSql = "update user set avatar = ? where usr = ?";

    // console.log("in", [avatar]);
    return dyn_qry(avatarSql, [avatar, usr]);
}