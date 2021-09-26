import on_asy_err from "../../../util/on_asy_err";
import on_asy_lod from "../../../util/on_asy_lod";
import tgl_lod from '../../../util/lod_sta';
import bus from "../../../util/bus";


const cck_with_combine = (carrier, noti) => {
    if(carrier instanceof Array) {
        return combine(noti, ...carrier);
    }

    return carrier;
}

const combine = (...funcs) => {

    return (res) => {
        funcs.forEach(func => {
            func(res);
        })
    }
    
}

const suc_noti = () => {
    bus.emit("suc_noti");
}
const fal_noti = () => {
    bus.emit("fal_noti");
}

const err_noti = () => {
    bus.emit("err_noti");
}


export default (req) => {
    return (on_suc=suc_noti, on_fal=fal_noti, on_err=err_noti, tgl = tgl_lod) => {
        
        const suc_exe = cck_with_combine(on_suc, suc_noti);
        const fal_exe = cck_with_combine(on_fal, fal_noti);
        const err_exe = cck_with_combine(on_err, err_noti);
        
        return (...args) => {
            tgl(true);
            req(...args)
            .then((res) => {
                on_asy_lod(tgl, res, suc_exe, fal_exe);
            })
            .catch(err => {
                console.log(err)
                on_asy_err(tgl, err, err_exe);
            })
        }
    }
}

