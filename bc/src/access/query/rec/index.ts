import RoomInfo from '@/dto/RoomInfo';
import query from '@/access/util/query';
import trans from '@/access/trans/rec';
import Room from '@/dao/Room';

export default async ():Promise <Array<RoomInfo>> => {

    const sql = "Select * from room";

    return query<Room>(sql)
    .then(
        (res:Array<Room>) => {
            return res.map(room => {
                return trans(room);
            })
        }
    );
}