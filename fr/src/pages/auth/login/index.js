import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import syn from '../../../util/syn_ipt';
import lgn from "../../../api/request/lgn";
import get_ivk from '../../../api/common/lib/get_ivk';

import { Card, Modal,Input, Button } from 'antd';
import per from '../../../api/request/per';
import LinedInput from '../../../com/lined_input';
import { set_usr } from "../../../lib/session";

import './index.css'
import bus from '../../../util/bus';


const view = (props) => {
    return (
        <div style={{
            fontSize: "2rem",
            height: "100vh"
        }}
        className={"login-total"}>
            <Card style = {{
                outerWidth: "40rem",
                maxWidth: "20em",
                margin: "5rem auto",
                borderRadius: "10px",
                padding: "10px"
            }} className={"login-card"}>
                <div className = "usr_wrp lgn-ipt">
                    <div className="usr-ins">用户名: </div>
                    <LinedInput  className="form-control"
                    onChange={props.on_usr_chg}/>
                </div>

                <div className = "pwd_wrp lgn-ipt">
                    <div className="usr-ins"> 密码: </div>
                     <LinedInput  className="form-control"
                    onChange={props.on_pwd_chg} type="password"/>
                </div>

                <div className = "lgn-btn" onClick={props.on_lgn} style={{
                    marginTop: "45px"
                }}> 
                    Login
                </div>

                <div className = "script" onClick={props.on_reg}>
                    还没注册?
                </div>

            </Card>

            <Modal visible={props.showTip} onOk={props.closeTip} onCancel={props.closeTip}>
                用户名和密码不匹配或用户名不存在
            </Modal>
        </div>        
    );
};


export default (props) => {

    const history = useHistory();
    const [usr, set_usrname] = useState("");
    const [pwd, set_pwd] = useState("");
    const [showTip, setShowTip] = useState(false);

    const closeTip = () => {
        setShowTip(false);
    }



    
    const on_suc = () => {
        return (valiRes) => {
            if(!valiRes.data) {
                setShowTip(true);
                return;
            }

            const on_suc = (res) => {
                const {avatar, hom_id, usr} = res.data;
                console.log(res.data);
                set_usr({avatar, usr, hom_id});
                
                bus.emit("loadPerInfo")
                history.replace("/rec");

           }
           const api = get_ivk(per)(on_suc);

           api(usr);
        }
    }


    const on_lgn = () => {
        const api = get_ivk(lgn)(on_suc());
        api(usr,pwd);
    }





    const on_reg = () => {
        history.push({pathname: "/reg"});
    }
    

    return view({
        on_usr_chg: syn(set_usrname),
        on_pwd_chg: syn(set_pwd),
        on_lgn,
        on_reg
    });
};


