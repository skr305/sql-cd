import { useEffect, useState } from "react"
import get_ivk from "../../api/common/lib/get_ivk";
import { get_r_situ } from "../../lib/session"
import room_log from "../../api/request/room_log";
import month_ocu_req from "../../api/request/month_ocu";
import { Skeleton } from "antd";
import './log.css';

export default (props) => {

    const [situDet, setSituDet] = useState({});
    const [loadDone, setLoadDone] = useState(false);
    const [monthOcu, setMonthOcu] = useState([]);

    useEffect(() => {
        const situ_r_id = get_r_situ();

        const on_suc = (res) => {
            console.log(res.data, 3);
            setSituDet(res.data);
            // setLoadDone(true);

            const onGetMonthOcu = (res) => {
                console.log(res.data);
                setMonthOcu(res.data);
                setLoadDone(true);
            }

            const monthOcuApi = get_ivk(month_ocu_req)(onGetMonthOcu);
            monthOcuApi(situ_r_id); 
        }

        const api = get_ivk(room_log)(on_suc);
        api(situ_r_id);
    }, [])


    return (
        <div className="log-total">
            
            {
               loadDone ? "" : <Skeleton/>
            }
                        
            <div className="log-list-body">
               <div className="his-wrp">
                    <div className="his-item-ins">
                        总产出额:
                        <div className="his-item-body">
                            {situDet.totalBen}
                        </div>
                    </div>
                    <div className="his-item-ins">
                        使用量次
                        <div className="his-item-body">
                            {situDet.totalCnt}
                        </div>
                    </div>

               </div>

               <div className="ocu-wrp" style={{
                       margin: "2em auto"
                   }}>
                   <div className="ocu-ins" style={{
                       margin: "2em auto",
                       fontSize: "1.2em",
                       fontWeight: "800",
                   }}>近两个月使用情况</div>
                   <div className="ocu-grid" style={{
                       marginLeft: "8em"
                   }}>
                        {monthOcu.map(day => {
                            const dayClass =  `situ-block  ${day == "0" ? "ocu-idle" : "ocu-in"}`
                            return (
                                <div className={dayClass}> 

                                </div>
                            )
                        })}
                   </div>
               </div>
            </div>
        </div>
    )
}