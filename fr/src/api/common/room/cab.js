import swc from '../../../lib/Router/swc'
import Bus from '../../../util/bus';

export const get_on_suc = () => {
    
    
    
    return async (res) => {
        console.log(res);
        const nxt_path = "/room";
        swc(nxt_path, res.data);
    }
}

export const get_on_fal = () => {
    return async (res) => {
        Bus.emit("room_fal", res);
    }
}


export const get_on_err = () => {
    return async (err) => {
        Bus.emit("room_err", err);
    }
}