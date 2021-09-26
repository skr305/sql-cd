type Room = {
    id: string;
    r_name: string;
    imgs: Buffer | string | null | undefined;
    hed_img: Buffer | string | null | undefined;
    itr: string;
    own: string;
    pos: string;

    ins: string | null | undefined;
    ser: string | null | undefined;
    prc: number;


    max: number;
}


export default Room;
