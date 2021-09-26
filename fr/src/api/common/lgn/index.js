import lgn_req from '../../request/lgn';
import on_asy_err from "../../../util/on_asy_err";
import on_asy_lod from "../../../util/on_asy_lod";
import tgl_lod from '../../../util/lod_sta';
import { get_on_fal, get_on_suc, get_on_err } from './cab';


const do_lgn = (usr, pwd) => {
    const on_suc = get_on_suc(usr, pwd);
    const on_fal = get_on_fal(usr, pwd);
    const on_err = get_on_err();
    
    tgl_lod(true);
    lgn_req(usr, pwd)
    .then((res) => {
        console.log(res);
        on_asy_lod(tgl_lod, res, on_suc, on_fal);
    })
    .catch(err => {
        on_asy_err(tgl_lod, err, on_err);
    })
    
}

export default do_lgn;