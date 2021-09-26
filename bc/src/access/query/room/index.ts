import trans from '@/access/trans/room';
import query from '@/access/util/query';
import Room from '@/dao/Room';
import RoomDet from '@/dto/RoomDet';


export default async ( id:string ):Promise<RoomDet> => {

    const sql = `Select * from room where id = "${id}"`;

    return query<Room>(sql)
    .then((res:Array<Room>) => {
        return trans(res[0]);  
    })
}