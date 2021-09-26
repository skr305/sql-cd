
import { useState, useEffect } from "react"
import { Card, Skeleton, notification, Input, DatePicker, Button } from "antd";
import trade_history from "../../api/request/trade";
import {get_usr } from '../../lib/session';
import get_ivk from "../../api/common/lib/get_ivk";
import Situation from '../../com/ocu_situ';
// import Cckocu from '../../com/cck_ocu';
import syn_ipt from "../../util/syn_ipt";
import moment from 'moment'

import denyInReq from '../../api/request/denyIn';

import '../../global.his.css'

/**
 * his.state 0 代表在住 1代表未住 2代表已住
 */
export default () => {

    const [his, set_his] = useState([]);
    const [inLoad, setInLoad] = useState(true);


    const [inDate, setInDate] = useState("2021-07-07");
    const [outDate, setOutDate] = useState("2021-07-08");
    const [findRId, setFindRId] = useState("");
    
    const onInDateChange = (moment, dateString) => {
        const timeFormat = 'YYYY-MM-DD';
        setInDate(moment.format(timeFormat));
        
    };

    const onOutDateChange = (moment, dateString) => {
        const timeFormat = 'YYYY-MM-DD';
        setOutDate(moment.format(timeFormat));
    };


    


    


    useEffect(() => {
        const on_suc = async (res) => {
            setInLoad(false);
            await set_his(res.data);
        }

        const api = get_ivk(trade_history)(on_suc);
        api(get_usr().usr);
    }, [])


    const STATE_MEANS = [
        "在住",
        "未住",
        "已住",
        "",
        "",
        "已退"
    ]


    const denyIn = (h_id,idx) => {


        const on_suc = () => {
            his[idx].state = "0";
            set_his(his);

            notification.open({
                message: `${h_id}: 入住登记成功`
            })
        };
        const api = get_ivk(denyInReq)(on_suc);
        api(h_id);
    }


    return (
        <div>
            <>
                {
                    inLoad ? 
                    <Skeleton/>
                    : his.map((item,idx)=> {
                        return (
                            <div className="his-wrp">
                                    <div className="his-item"> 
                                        <div className="his-item-ins">
                                            R_ID:
                                        </div>
                                        <div className="his-item-body">
                                            { item.r_id} 
                                        </div>
                                        
                                    </div>
                                    <div className="his-item"> 
                                        <div className="his-item-ins">
                                            房间号:
                                        </div>
                                        <div className="his-item-body">
                                            { item.r_code} 
                                        </div>
                                        
                                    </div>
                                    <div className="his-item"> 
                                        <div className="his-item-ins">
                                            日期:
                                        </div>
                                        <div className="his-item-body">
                                            { item.in_date} - { item.out_date } 
                                        </div>
                                        
                                    </div>
                                    <div className="his-item"> 
                                        <div className="his-item-ins">
                                            实付:
                                        </div>
                                        <div className="his-item-body">
                                            { item.prc} 
                                        </div>
                                        
                                    </div>


                                    <div className="his-item"> 
                                        <div className="his-item-ins">
                                            当前状态:
                                        </div>
                                        <div className="his-item-body">
                                            { STATE_MEANS [item.state] } 
                                        </div>
                                        
                                    </div>
                                    
                                    
                                    <div style={{
                                        visibility: item.state == 1 ? "inherit" : "hidden"
                                     }}>
                                        <Button onClick={() => denyIn(item.h_id, idx)}> 确认入住 </Button>
                                    </div>
                                    
                                </div>
                        )
                    })
                }

                

            </>

            

        </div>
    )
}
