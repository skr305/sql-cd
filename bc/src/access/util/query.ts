import connection from '@/access/connection';
import FailError from '@/lib/errors/fail-access';

const query = async <T> (sql:string) : Promise<Array<T>> => {

    return new Promise((resolve) => {
        connection.getConnection().query(sql, function (err:any, result:Array<T>) {
            if(err) {
                console.error(err);
                throw new FailError("数据库查询错误");
            }

            resolve(result);
        })
    });
}

export default query;