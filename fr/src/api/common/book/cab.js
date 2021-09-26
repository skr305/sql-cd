import swc from '../../../lib/Router/swc'
import Bus from '../../../util/bus';
import rec from '../../request/rec';

export const get_on_suc = (usr, pwd) => {
    

    return async (res) => {
        
        const rooms = await rec(usr);
        const nxt_path = "/rec";    
        swc(nxt_path, {rooms: rooms.data});

    }
}

export const get_on_fal = (usr, pwd) => {
    return (res) => {
        Bus.emit("lgn_fal", res);
    }
}


export const get_on_err = () => {
    return (err) => {
        Bus.emit("lgn_err", err);
    }
}