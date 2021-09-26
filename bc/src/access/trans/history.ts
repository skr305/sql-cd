import RawHistory from "@/dao/RawHistory";
import _History from "@/dto/History";

export default (raw_his:RawHistory):_History => {
    const date_peer = raw_his.dates.split("|");
    
    const in_date = date_peer[0];
    const out_date = date_peer[1] || "";

    return {...raw_his, in_date, out_date};
}