import { Input, DatePicker, Spin } from 'antd';
import { useEffect, useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import syn from '../../util/syn_ipt';

import moment from 'moment'
import get_ivk from '../../api/common/lib/get_ivk';
import idle from '../../api/request/idle';
import { get_room,get_usr,set_trade } from '../../lib/session';
import { useHistory } from 'react-router-dom';
import get_discount from '../../api/request/get_discount';

import './index.css'
const view = (props) => {
    return (
        <div className="date-sel">
            <div className="prc">
                <span style={{
                    fontWeight: "800",
                    fontSize:"1.3rem"
                }}>价格:</span> ￥{props.price}
            </div>

            <div className="discount-total">
                <div className="discount-ins his-ins">折扣</div>
                <div className="discount-list">
                    {
                        props.discounts.length > 0 ?
                         props.discounts.map((dis,idx) => {
                            return (
                                <div className="discount-item"> 
                                    <div className="discount-name">
                                        {dis.d_name}:
                                    </div>
                                    <div className="discount-extent">
                                        {dis.extent}折
                                    </div>
                                </div>
                            )
                        }) : "暂无"
                    }
                </div>
            </div>
            
            <div className="cld in_time">
                <span className="ins cld_ins" style={{
                    fontSize: "1.2rem",
                    fontWeight: "800"
                }}> 入住时间-离开时间 </span>
                <div style={
                    {
                        display: "flex"
                    }
                }>
                <br/>
                <DatePicker
                size="large"
                defaultValue={moment(props.in_date)}
                onChange={props.onInDateChange}
                style={{
                    margin: "0 5px 0 0px"
                }}/>
                -

                <DatePicker 
                size="large"
                defaultValue={moment(props.out_date)}
                fullscreen={false}
                onChange={props.onOutDateChange}/>
                </div>
                
            </div>

            

            <div className="pers" style={{
                margin: "10px",
                marginTop: "20px"
            }}>
            
                <Input placeholder="1" type="number" 
                className="sm_ipt" prefix={<UserOutlined/>} 
                onChange={props.onPersChange}
                size="small"/>

            </div> 

            <div className="total-prc his-item-ins">
                ￥{props.totalPrc}
            </div>


            

            {/* the tip emit if there isn't idle room */}
            {
                (() => {
                    if(props.idl_loading) {
                        return (
                            <Spin spinning={true}>加载中</Spin>
                        )
                    }

                    if(!props.idl) {
                        return (
                            <div className="non_tip"> 
                                这段时间没有空闲房间了
                            </div>
                        )
                    }

                    return (
                        <div className="ava-book">可订</div>
                    )
                    
                })()
            }

            <div>
                {
                    (() => {
                        if(props.idl) {
                            return <div onClick={props.book} className="on-book"> 预订 </div>
                        }
                        return (<div> 此日期不可订 </div>)
                    })()
                }
            </div>
        </div>
    )
}


export default (props) => {
    
    const history = useHistory();

    const r_id = get_room();
    const r_name = props.r_name;

    const [idl_loading, set_idl_loading] = useState(false);

    const [in_date, set_in_date] = useState("2021-09-09");
    const [out_date, set_out_date] = useState("2021-09-12");
    const [pers, set_pers] = useState(1); 
    const [idl, set_idl] = useState(true);

    const [totalPrc, setTotalPrc]  = useState(0); 
    //discount 
    const [discounts, setDiscounts] = useState([]);

    useEffect(() => {

        setTotalPrc(get_t_prc());

        // console.log(totalPrc, in_date, out_date, props.price, props)
        const on_suc = (res) => {
            const has_idle = res.data != "-1";
            
            set_idl(has_idle);
            set_idl_loading(false);

            if(!has_idle) {
                return;
            }

            

            set_trade({r_id, usr:get_usr().usr, r_code: res.data, number:get_t_prc(), in_date, out_date, name:r_name});
        }

        const api = get_ivk(idle)(on_suc);

        api(r_id, in_date, out_date);


    }, [in_date, out_date, discounts])

    

    useEffect(() => {
        const on_suc = (res) => {
            setDiscounts(res.data);
        }
        const api = get_ivk(get_discount)(on_suc);
        api(r_id);
    }, [])


    
   



    const get_t_prc = () => {
        const dif_days = moment(out_date).diff(moment(in_date), "days");
        let now_prc = dif_days * props.price
        for(let discount of discounts) {
            now_prc *= Number(discount.extent) / 100;
        }
        return now_prc; 
    }


    const onInDateChange = (moment, dateString) => {
        console.log("in", moment);
        const timeFormat = 'YYYY-MM-DD';
        set_in_date(moment.format(timeFormat));
        
    };

    const onOutDateChange = (moment, dateString) => {
        const timeFormat = 'YYYY-MM-DD';
        set_out_date(moment.format(timeFormat));
    };


    const book = () => {
        history.push("/book");
    }



    return view({
        ...props, 
        onInDateChange, 
        onOutDateChange,
        onPersChange: syn(set_pers),
        totalPrc,
        idl,
        book,
        in_date,
        out_date,
        discounts,

    });
}