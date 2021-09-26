import { useEffect, useState } from "react"
import get_ivk from "../../api/common/lib/get_ivk";
import mes_req from "../../api/request/mes";
import { get_usr } from "../../lib/session";
import { Skeleton, Modal, notification } from "antd";
import OcuSitu from '../../com/ocu_situ';
import change from '../../api/request/change'
import LinedInput from "../../com/lined_input";
import CckOcu from "../../com/cck_ocu";
import moment from 'moment';
import on_read from "../../api/request/on_read";
import './index.css'
import { useHistory } from "react-router-dom";
/** 0 for feedback, 1 for change room, 2 for dis room */

export default (props) => {

    const history = useHistory();
    const readMes = (m_id) => {

        


        const idx = curMesIdx;
        const api = get_ivk(on_read)(()=>{}, ()=>{}, ()=>{});
        api(m_id);

        const newMess = mesList;
        newMess[idx].has_read = "1";
        setMesList(newMess);
    
    }

    useEffect(() => {
        const on_suc = (res) => {
            // console.log(res.data)
            setLoadDone(true);
            setMesList(handleRawMesList(res.data));

            
        }

        const api = get_ivk(mes_req)(on_suc);
        api(get_usr().usr);
    }, [])

    
    const [loadDone, setLoadDone] = useState(false);
    const [mesList, setMesList] = useState([]);


    const [curMes, setCurMes] = useState({});
    const [showDet, setShowDet] = useState(false);

    const [curMesIdx, setCurMesIdx] = useState(0);

    const [showChangeModal, setChangeModal] = useState(false);
    const beginChange = () => {
        setChangeModal(true);
    }

    const onCloseChange = () => {
        setChangeModal(false);
    }

    const [showOcu, setShowOcu] = useState(false);

    const onOcuToggle = () => {
        history.push("/trade/ocu")
        // setShowOcu(!showOcu);
    }



    const onOpenDet = (idx) => {
        

        setCurMes(mesList[idx]);
        
        setCurMesIdx(idx);
        // console.log(mesList[idx].has_read)
        // no change-room
        if(mesList[idx].type != "1") {
            readMes(mesList[idx].m_id);
        }

        setShowDet(true);
    }

    const onCloseDet = () => {
        setShowDet(false);
    }

    const tag = ["反馈", "换房", "退房"]

    const handleRawMesList = (raw) => {
        console.log(raw);
        return raw.map(oneMes => {
            if(oneMes.type == "1") {

                console.log(oneMes.content);
                const {cause, r_id, r_code, h_id} = JSON.parse(oneMes.content);
                oneMes.content = cause;
                oneMes.r_id = r_id;
                oneMes.r_code = r_code;
                oneMes.h_id = h_id
            }
          
            oneMes._date = moment( JSON.parse(oneMes._date) ).format("YYYY-MM-DD");

            return oneMes;
        })
    }


    const onDenyChange = () => {
        const on_suc = () => {
            notification.open({
                message: "换房处理完成"
            })

            readMes(curMes.m_id);
        }
        const api = get_ivk(change)(on_suc);
        api(curMes.h_id, curMes.r_code);
    }

    
    return (
        <div>
            {loadDone ? "" : <Skeleton/>}
            <div className="">
                {
                    mesList.map((mes, idx) => {
                        return (<div className="his-wrp" onClick={() => onOpenDet(idx)}> 
                            <div className="sender-tag"> {mes.sender} </div>
                            <div> 日期: {mes._date} </div>
                            <div> {mes.content} </div>
                            <div> {mes.r_id ? "房间号:"+mes.r_id : ""} </div>
                            <div> {mes.r_code ? "房间号:"+mes.r_code : ""} </div>
                            {mes.has_read !="0" ? "" : (<div className="mes-read"></div>)}
                        </div>)
                    })
                }
            </div>


            <Modal onOk={onCloseDet} onCancel={onCloseDet} visible={showDet}>
                <div className="mes-det-wrp">
                    <div className="his-item-ins"> 
                        { tag[curMes.type] }
                    </div>
                    <br/>

                    <div className="his-item-body"> 
                        { curMes.content }
                    </div>

                    {curMes.type == 1 && curMes.has_read=="0"? (<div className="change-room lgn-btn"
                    onClick={beginChange}>处理请求</div>)
                     : ""}
                    {
                        curMes.type == 1 && curMes.has_read=="1" ? "已经处理请求" : ""
                    }
                </div>
            </Modal>

            <Modal onOk={onCloseChange} onCancel={onCloseChange} visible={showChangeModal}>
                <LinedInput placeholder="请输入换房的房号"/>
                <div  className="on-change lgn-btn" onClick={onDenyChange}>
                    确认
                </div>

                <div  className="cck-ocu lgn-btn" onClick={onOcuToggle}>
                    查看资源情况
                </div>

                {
                    showOcu ? (
                        <div> 
                            hello
                            <CckOcu/>
                        </div>
                        
                    ) : ""
                }
            </Modal>
        </div>
        
    )


}