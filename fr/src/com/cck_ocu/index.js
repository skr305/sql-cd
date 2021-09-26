import { DatePicker } from "antd";
import Situation from '../ocu_situ';
import moment from 'moment';
import { useState } from "react";
import LinedInput from "../lined_input";
import syn from '../../util/syn_ipt';

export default (props) => {
    const [inDate, setInDate] = useState("2021-09-02");
    const [outDate, setOutDate] = useState("2021-10-05");
    const [findRId, setFindRId] = useState("");
    
    const onInDateChange = (moment, dateString) => {
        const timeFormat = 'YYYY-MM-DD';
        setInDate(moment.format(timeFormat));
        
    };

    const onOutDateChange = (moment, dateString) => {
        const timeFormat = 'YYYY-MM-DD';
        setOutDate(moment.format(timeFormat));
    };


    return (
        <div style = {
            {
                
            }
        }>
            
            <div style={{
                border: "solid 1px black",
                display: "flex",
                width: "60vw",
                padding: "3em 3em",
                margin: "3em auto",
                justifyContent: "space-around"
            }}> 
                起始日期: <DatePicker onChange={onInDateChange} defaultValue={moment(inDate)}/>
                终止日期: <DatePicker onChange={onOutDateChange} defaultValue={moment(outDate)}/>

                RID: <LinedInput onChange={syn(setFindRId)}/>
            </div>
            
            
            <Situation r_id={findRId} in_date={inDate} outDate={outDate}/>
            

        </div>
    )
}