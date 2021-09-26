import {
    HashRouter as Router,
    Redirect,
    Route,
    Switch,
} from 'react-router-dom';
import {useHistory} from 'react-router-dom';
import Trade from './entity/Trade';

import { Card, Modal, Spin, Skeleton } from "antd"
import { useState } from 'react'; 

import Pay from '../../com/hom';
import get_ivk from '../../api/common/lib/get_ivk';
import { get_trade, get_idens } from '../../lib/session';
import {CheckCircleTwoTone, CheckCircleOutlined, ExclamationCircleOutlined} from '@ant-design/icons'

import book from '../../api/request/book';
import './index.css'

class PayState {

    /**
     * 0 for before pay
     * 1 for pending
     * 2 for success
     * 3 for fail
     * 
     */
    state = 1;

    constructor(stateDescriptor=1){
        if(!isNaN(Number(stateDescriptor)) && Number(stateDescriptor) > 0 && Number(stateDescriptor) <= 3) {
            return this.state = stateDescriptor
        }

        const stringDescriptors = ["before","pending","success","fail"];
        if(stringDescriptors.includes(stateDescriptor)) {
            return this.state = stringDescriptors.indexOf(stateDescriptor)
        } 

        throw Error("BAD INPUT IN PAY STATE: PayState");
    }
}


class PayMeta {
    price = 0;
    //0: pending, 1: suc, 2: fal
    callback = [];

    state = new PayState(0);

    constructor(price, callback) {
        this.price = price;
        this.callback = callback;
    }
}



const view = (props) => {

    

    return (
        <Card>
            <div style={{
                visibility: props.paying != 0 ? "hidden" : "inherit"
            }} className="pay-wrp">
                <div className="pay-info"> 支付给:{ props.cur_pay.name} </div>
                <div className="pay-info pay-number"> ￥ {props.cur_pay.number} </div>

                <Pay onInput={props.onInput}/>
                
                
                <div onClick = {props.onPay} className="lgn-btn">
                    支付
                </div>
            </div>
            {
                (() => {
                    

                    if(props.paying == 2) {
                        return (
                            <div className="pay-tip suc-tip"> 
                                <CheckCircleOutlined />支付成功
                                
                            </div>
                        )
                    }

                    if(props.paying == 3) {
                        return (
                            <div  className="pay-tip fal-tip">  
                                <ExclamationCircleOutlined />支付失败 
                            </div>
                        )
                    }

                    if(props.paying == 1) {
                        return (
                            <div  className="pay-tip loading">
                                <Skeleton/>
                            </div>
                        )
                    }
                    
                }) ()
            }

            
        </Card>
    )
}


export default (props) => {
     /**
     * 0 for before pay
     * 1 for pending
     * 2 for success
     * 3 for fail
     * 
     */
    
    const [paying, set_paying] = useState(0);
    const [pwd, set_pwd] = useState("");
    const cur_pay = get_trade();

    const onPay = () => {


        set_paying(1);
        props.onBeginPay();

        const payExe = () => {
            
            const onGetRes = async (res) => {
                console.log(res);
                set_paying(await props.onPayResGet(res));
            }
    
            const api = get_ivk(book) (onGetRes, onGetRes, onGetRes);
            api(cur_pay.usr, cur_pay.r_code, cur_pay.r_id, cur_pay.in_date, cur_pay.out_date, cur_pay.number, pwd,
                JSON.stringify(get_idens()));
        }

        console.log(pwd)

        setTimeout(payExe, 1500);
       
    }

    const onInput = (value) => {
        set_pwd(value);
    }

    return view({
        paying,
        onPay,
        onInput,
        cur_pay
    })
}
