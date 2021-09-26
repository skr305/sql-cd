import cck from './util/cck';
import out from './util/out';
import put_in from './util/put_in';

export default async ( usr_id: string, tgt_id: string, pwd: string, num: number ):Promise <number> => {
    const cckResult = await cck(usr_id, pwd, num);

    if(cckResult >= 0) {
        await out(usr_id, num);
        await put_in(tgt_id, num);

        return 0;
    }

    return cckResult;
    
}