import RawRegRoom from "@/dto/RawRegRoom";
import ID from "@/access/util/ID";
import dyn_qry from "@/access/util/dyn_qry";
import RawCell from '@/dto/RawCell';


export default async (reg:RawRegRoom):Promise<string> => {
    
    const r_id = ID.RID();
    const reg_code = ID.REGCODE();
    const vali_code = "-1";

    const cells_arr:Array<RawCell> = JSON.parse(reg.cells);

    const room_max_num = (() => {
        let count = 0;
        for (let i=0; i<cells_arr.length; i++) {
            count += Number(cells_arr[i].end) - Number(cells_arr[i].begin) + 1;
        
        }

        return count;
    })()

    //generate the room
    const generateRoom = `insert into regroom (id, hed_img, imgs, r_name, itr, ins, ser, own, prc, pos, max, reg_code, vali_code)
     values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

     const room_data = [r_id, reg.hed_img, reg.imgs, reg.r_name, reg.itr, reg.ins,
    reg.ser, reg.own, reg.prc, reg.pos, room_max_num, reg_code, vali_code];

    dyn_qry(generateRoom, room_data);
    
    
    //add the roomcode to the room
    const inCell = `insert into cell (r_id, head, \`begin\`, \`end\`) values (?, ?, ?, ?)`;
    
    const inCellExe = async ():Promise<boolean> => {
        let inCellRes = true;

        for(let cell of cells_arr) {
            const cell_data = [r_id, cell.head, cell.begin, cell.end];
            inCellRes = await dyn_qry(inCell, cell_data) && inCellRes;
        }
        

        return inCellRes;
    }


    await inCellExe();
    

    return reg_code;
}