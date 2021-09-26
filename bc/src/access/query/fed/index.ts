import dyn_qry from "@/access/util/dyn_qry";
import ID from "@/access/util/ID";
import history from "../history/byId"
import own from "../lib/usr/own";
import onDis from "../room-accident/on-dis";

/** for the feedback, changeroom, disroom */
export default async (fed: FeedReq):Promise<boolean> => {
    
    const m_id = ID.MID();
    
    const his_rec = await history(fed.h_id);

    //the owner of the room 
    const owner = await own(his_rec.r_id);

    console.log(owner, his_rec.r_id);

    // the date of now;
    const cur_date = new Date().getTime();


    /** has_read 0 means un_read 1 means readed */
    const sql = `insert into mes (m_id, sender, target, content, \`type\`, _date, has_read) values (?, ?, ?, ?, ?, ?, ?)`;

    console.log(fed.type, fed.type == "1")
    // is it change room?
    const inContent = fed.type == "1" ? JSON.stringify({cause: fed.content, r_id: his_rec.r_id,
         r_code: his_rec.r_code, h_id: fed.h_id }) : fed.content;

    console.log(inContent, fed.type);
    const data = [m_id, his_rec.u_id, owner.usr, inContent, fed.type, cur_date, 0];
    
    /** 2退房请求 */
    if(fed.type == "2") {
        await onDis(fed.h_id);
    }

    return dyn_qry(sql, data)
}