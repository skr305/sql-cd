import room_req from '../../request/room';
import on_asy_err from "../../../util/on_asy_err";
import on_asy_lod from "../../../util/on_asy_lod";
import tgl_lod from '../../../util/lod_sta';
import { get_on_fal, get_on_suc, get_on_err } from './cab';


const do_room = (id) => {
    const on_suc = get_on_suc(id);
    const on_fal = get_on_fal(id);
    const on_err = get_on_err(id);
    
    tgl_lod(true);
    room_req(id)
    .then((res) => {
        console.log(res);
        on_asy_lod(tgl_lod, res, on_suc, on_fal);
    })
    .catch(err => {
        console.log(err);
        on_asy_err(tgl_lod, err, on_err);
    })
    
}

export default do_room;