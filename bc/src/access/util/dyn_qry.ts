import connection from '@/access/connection';
import FailError from '@/lib/errors/fail-access';
import log from '@/lib/log';

const query = async  (sql:string, data: Array<any>) : Promise<boolean> => {

    return new Promise((resolve) => {
        connection.getConnection().query(sql, data, function (err:any) {
            if(err) {
                console.error(err);
                log(err);
                // throw new FailError("数据库查询错误");
            }

            resolve(true);
        })
    });
}

export default query;