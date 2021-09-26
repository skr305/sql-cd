import { useState, useEffect } from "react"
import { Card, Input, Modal, Button } from "antd";
import fed from "../../api/request/fed";
import history from "../../api/request/history";
import {get_usr } from '../../lib/session';
import syn from '../../util/syn_ipt';
import get_ivk from "../../api/common/lib/get_ivk";
import '../../global.his.css';

/**
 * his.state 0 代表在住 1代表未住 2代表已住
 */
export default () => {

    const [his, set_his] = useState([]);

    const [in_det, set_in_det] = useState(false);
    const [his_det, set_his_det] = useState({});
    /** 0 for feedback, 1 for change room, 2 for dis room, 3 for not feedback */
    const [fedCode, set_fedCode] = useState(3);

    const [fedCont, setFedCont] = useState("");



    const feedback = () => {
        const on_suc = () => {
            set_fedCode(3);
        }
        // console.log("in");
        const api = get_ivk(fed)(on_suc);

        api(his_det.h_id, fedCont, String(fedCode));
    }

    const onFeedModal = fedCode => {
        set_fedCode(fedCode);
    }




    useEffect(() => {
        const on_suc = async (res) => {
            await set_his(res.data);
        }

        const api = get_ivk(history)(on_suc);
        api(get_usr().usr);
    }, [])


    const onCloseDet = () => set_in_det(false);
    const onCloseFed = () => set_fedCode(3);

    const find_det = (idx) => {
        set_his_det(his[idx]);
        set_in_det(true);
    }





    return (
        <div>
            <div className="his-entry">交易历史</div>
            <>
                {
                    his.map((item,idx )=> {
                        return (
                            <div onClick={()=>find_det(idx)}>
                                <div className="his-wrp">
                                    <div className="his-title"> { item.r_id} </div>
                                    <div className="his-item">
                                        <div className="his-item-ins">日期</div>
                                        <div className="his-item-body"> { item.in_date }  {item.out_date} </div>
                                    </div>
                                    <div className="his-item">
                                        <div className="his-item-ins">实付</div>
                                        <div className="his-item-body"> {item.prc} </div>
                                    </div>

                                    <div className="his-item">
                                        <div className="his-item-ins large-font">乘客信息</div>
                                        { 
                                            JSON.parse(item.iden).map((oneGuest, idx) => {
                                                return (
                                                    <div style={{
                                                        display: "flex",
    
                                                    }}>
                                                        <div className="his-item-ins">姓名{oneGuest[0]}</div>
                                                        <div className="his-item-body"> 身份证号 {oneGuest[1]} </div>
                                                    </div>
                                                    
                                                )
                                            })
                                        }   
                                        
                                    </div>
                                    
                                </div>
                            </div>
                        )
                    })
                }
            </>

            <Modal visible={in_det} onOk={onCloseDet} onCancel={onCloseDet} >
                {
                    (() => {
                        if(!in_det) {
                            return ""
                        }

                        return (<div>
                            <div> {his_det.name} </div>
                            <div> 房号: {his_det.r_code} </div>
                            <p> 
                            状态: {
                                (() => {
                                    if(his_det.state == 0) {
                                        return "在住";
                                    } 
                                    if (his_det.state == 1) {
                                        return "未住";
                                    }
                                    
                                    if (his_det.state == 2) {
                                        return "已住";
                                    }
                                    // 5 for dis
                                    return "已退"
                                    
                                })()    
                            } </p>
                            
                            <div>
                                {
                                    (() => {
                                        if(his_det.state == "0") {
                                            return (<Button onClick={() => onFeedModal(1)}>
                                                换房
                                            </Button>)
                                        }
                                        if(his_det.state == "1") {
                                            return (<Button onClick={() => onFeedModal(2)}>
                                                退房
                                            </Button>)
                                        }

                                        return ""
                                    })()
                                }
                            </div>
                            <div onClick={() => onFeedModal(0)}>反馈</div>
                        </div>)
                    })()
                }
            </Modal>

            <Modal visible={[0,1,2].includes(fedCode)} onOk={feedback} onCancel={onCloseFed}>
                {
                    (() => {
                        if(fedCode == 0) {
                            return "请提供您的宝贵意见"
                        }
                        if(fedCode == 1) {
                            return "请填写换房原因"
                        }
                        if(fedCode == 2) {
                            return "请填写退房原因"
                        }
                        return ""
                    }) ()
                }

                <Input onChange={syn(setFedCont)}></Input>
            </Modal>
        </div>
    )
}