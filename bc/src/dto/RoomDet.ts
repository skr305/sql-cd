type RoomInfo = {
    id: string;
    r_name: string;
    imgs: string | null | undefined;
    hed_img: string | null | undefined;
    itr: string;
    own: string;
    pos: string;

    ins: string | null | undefined;
    ser: string | null | undefined;
    prc: number;

    max: number;
}

export default RoomInfo;