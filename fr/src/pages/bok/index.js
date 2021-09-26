import { Button, Modal, notification } from "antd"
import { useState } from "react";

import Pay from '../pay'
import { get_room_info, get_trade } from "../../lib/session";
import './index.css'
import '../../global.css';
import cidIden from './cidIden';

import { set_idens } from "../../lib/session";
import syn_ipt from "../../util/syn_ipt";
import LinedInput from "../../com/lined_input";

export default (props) => {

    
    const cur_pay = get_trade();
    /**
     * 0 for before pay
     * 1 for pending
     * 2 for success
     * 3 for fail
     * 
     */
    const [trSta, set_trSta] = useState(0);

    const [failCause, setFailCause] = useState("");

    const [inPayModal, setInPayModal] = useState(false);

    const [idens, setIdens] = useState([]);

    // modal ctl

    const [showAddIdens, setShowAddIdens] = useState(false);

    const openShowAddIdens = () => {
        setShowAddIdens(true);
    }

    const closeShowAddIdens = () => {
        setShowAddIdens(false);
    }

    // 
    const [cacheGuestName, setCacheGuestName] = useState("");
    const [cacheIden, setCacheIden] = useState("");


    const onSubmitGuest = () => {
        if(!cidIden(cacheIden)) {
            notification.open({
                message: "错误的身份证号"
            })
            return
        }
        const newIdens = idens;
        newIdens.push([cacheGuestName, cacheIden]);
        setIdens(newIdens);
        set_idens(newIdens);
        closeShowAddIdens();        
    }

    const room_info = get_room_info();

    const onPay = () => {
        setInPayModal(true);
    }



    const onClosePay = () => {
        if(trSta != 1) {
            setInPayModal(false);
        }
    }
        
    

    const FAIL_RESULT = {
        "1": "余额不足",
        "2": "此房间已被占用 清稍后重试",
        "3": "您还没有HOM支付的账户，请开通后重试",
        "4": "密码错误"
    }

    // 0代表成功 1代表没有足够余额 2代表此房间已被占用 3代表此用户没有开户
    const onPayResGet = (res) => {


        
        const code = res.data;

        // trSta: /**
        // * 0 for before pay
        // * 1 for pending
        // * 2 for success
        // * 3 for fail
        // * 
        // */

        if(code == 0) {
            set_trSta(2);
            return 2;
        } else {
            set_trSta(3);
            setFailCause( FAIL_RESULT[code]);
            return 3;
        }

    }

    const onBeginPay = () => {
        set_trSta(1);
    }


    return (
        <div>
            <div style={{
                fontSize: "30px",
                fontWeight: "100",
                padding: "0 0 30px 0",
                borderBottom: "1px solid rgb(96, 96, 228)",
                width: "7em",
                margin: "0 auto"
            }}>
                确认并支付
            </div>
        {/* // r_id, r_code, usr, number, in_date, out_date, name */}

        <div style={{

            marginLeft: '30px',
            
        }} className="book-left">
            <div style={{ fontSize: "2.1rem", fontWeight: "800",lineHeight: "2em" }}> { cur_pay.name } </div>
                <div style={{ fontSize: "1.8em", fontWeight: "800", lineHeight: "2em" }}> 您的行程  </div>
                <div style={{ fontSize: "1.3rem", fontWeight: "100", lineHeight: "2em" }}>
                    
                    <div> 价格: { cur_pay.number } </div>
                    {/* <div> 房间号: {cur_pay.r_code} </div> */}
                    <div> 日期: {cur_pay.in_date} 至 {cur_pay.out_date} </div>
                    <div> 入住人数: 小于5人 </div>
                    <div> 入住时间: 上午8:00 - 下午10:00 </div>
            </div>
        </div>
            

            {
                (() => {
                    if(trSta == 0) {
                        return <div> { idens.length > 0 ? (<div className="lgn-btn book-btn" onClick={onPay}> 支付 </div>) : ""} </div>
                    } else if(trSta == 1) {
                        return (<div className="book-res-tip"> 支付中， 请稍后 </div>)
                    } else if(trSta == 2) {
                        return (<div className="book-res-tip suc-tip"> 您的房间已预订成功 </div>)
                    }
                    return (<div className="book-res-tip fal-tip" style={{color: "red", fontWeight: "100"}}>
                        预订失败: { failCause }
                        {/* <div className="lgn-btn book-btn" onClick={onPay}> 重新支付 </div> */}
                    </div>)
                })()
            }
            
            <div className={"room-info"}>
                <div style={{
                    fontSize: "20px",
                    fontWeight: "100"
                }}>

                </div>
                <div className="room-info-img-wrp">
                    <img src={room_info.hed_img}
                    style={{
                        width: "23em",
                        height: "12em",
                        objectFit: "cover",
                        borderRadius: "5em",
                        borderBottom: "solid 3px black"
                    }}/>

                    
                </div>

                <div style={{
                    position: "absolute",
                    top: "5em"
                }}>
                <div style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "space-around",
                        marginTop: "30px"
                    }}>
                        <div className="big-font">
                            {room_info.r_name}
                        </div>
                        <div className="med-font green-simp">
                            ￥{cur_pay.number}
                        </div>

                        <div className= "med-font">
                            价格明细: <span className="small-font green-simp">
                                ￥{room_info.prc} x {Number(cur_pay.number) 
                                / Number(room_info.prc)} = ￥{cur_pay.number}
                            </span>
                        </div>

                        <div className="simp-font med-font">
                            服务费: { cur_pay.ser_number ||  "0.00"}
                        </div>
                </div>
                </div>
                
            </div>
            
                <div>
                    <div style={{
                        fontSize: "1.3rem",
                        fontWeight: "800",
                        margin: "1em auto"
                    }}> 乘客信息 </div>
                    <div> 
                        {
                            idens.map((iden, idx) => {
                                return (
                                    <div style={{
                                        display: "flex",
                                        justifyContent: "center"
                                    }}>
                                        <div className="his-item-body"> 姓名: {iden[0]} </div>
                                        --<div className="his-item-body"> 身份证号: {iden[1]} </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="lgn-btn" onClick={openShowAddIdens}>
                        添加客人
                    </div>

                    
                </div>
                <div  style={{
                        // marginBottom: "10em",
                        height: "6em" 
                    }}></div>
            <Modal visible={showAddIdens} onOk={onSubmitGuest} onCancel={closeShowAddIdens}
            mask={false}> 
                <div>
                    <LinedInput label="姓名" onChange={syn_ipt(setCacheGuestName)}/>
                    <LinedInput label="身份证号" onChange={syn_ipt(setCacheIden)}/>

                    <div className="lgn-btn" onClick={onSubmitGuest}>提交</div>
                </div>
            </Modal>

            <Modal visible={inPayModal} onOk={onClosePay} onCancel={onClosePay} footer={null}
            mask={false}> 
                <Pay onPayResGet={onPayResGet} onBeginPay={onBeginPay}></Pay>
            </Modal>

        </div>
    )
}