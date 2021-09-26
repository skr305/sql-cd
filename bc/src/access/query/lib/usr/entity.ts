import User from "@/dao/User";
import query from "@/access/util/query";

/**
 * get the entity of the user with the id
 */
const entity = async (usr:string):Promise<User> => {
    const sql = `Select * from user where usr = "${usr}"`;

    return query<User>(sql)
    .then(
        res => res[0]
    );
}


export default entity;
