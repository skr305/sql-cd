const set_session = (in_sec, data) => {
    sessionStorage.setItem(in_sec, JSON.stringify(data));
}

const get_session = (sec) => {
    return JSON.parse(sessionStorage.getItem(sec));
}

export const set_usr = ({avatar, usr, hom_id}) => {
    set_session("usr", {avatar, usr, hom_id});
}


export const get_usr = () => {
    return get_session("usr");
}

export const set_trade = ({r_id, r_code, usr, number, in_date, out_date, name}) => {
    set_session("trade", {r_id, r_code, usr, number, in_date, out_date, name});
}

export const get_trade = () => {
    return get_session("trade");
}

export const set_room = (r_id) => {
    set_session("room", r_id);
}


export const get_room = () => {
    return get_session("room");
}


export const set_room_info = ({id, hed_img, r_name, prc, pos}) => {
    set_session("room_info", {id, hed_img, r_name, prc, pos});
}


export const get_room_info = () => {
    return get_session("room_info");
}



export const set_r_situ = (id) => {
    set_session("r_situ", id);
}


export const get_r_situ = () => {
    return get_session("r_situ");
}


export const get_idens = () => {
    return get_session("iden")
}

// data [[name, idens]]
export const set_idens = (data) => {
    set_session("iden", data);
}