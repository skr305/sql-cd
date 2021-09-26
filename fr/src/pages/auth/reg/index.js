import { useState } from "react"
import syn from '../../../util/syn_ipt';
import { Card, Input, Button, Modal } from 'antd';
import { set_usr } from "../../../lib/session";
import get_ivk from "../../../api/common/lib/get_ivk";
import { useHistory } from "react-router-dom";
import per from "../../../api/request/per";
import reg_req from '../../../api/request/reg';
import './index.css'
import LinedInput from '../../../com/lined_input';

export default (props) => {
    
    const [pwd1, set_pwd1] = useState("");
    const [pwd2, set_pwd2] = useState("");
    const [usrname, set_usrname] = useState("");

    const [showTip, setShowTip] = useState(false);

    const closeTip = () => {
        setShowTip(false);
    }

    const history = useHistory();

    const on_suc = (valiRes) => {
        if(valiRes.data == "1") {
            setShowTip(true);
            return;
        }   

        const per_info_suc = (res) => {
            const {avatar, hom_id, usr} = res.data;
            set_usr({avatar, usr, hom_id});
            
            history.replace("/rec");

       }
       const api = get_ivk(per)(per_info_suc);

       api(usrname);
    }

    const script = () => {
        const api = get_ivk(reg_req)(on_suc);
        api(usrname, pwd1);
    }

    return (
        <div className="login-total">
            <Card 
            style ={{
                outerWidth: "40rem",
                maxWidth: "20em",
                margin: "5rem auto",
                borderRadius: "10px",
                padding: "10px",
                textAlign: "left"
            }} className="login-card">

                <div className="reg-ins"> 注册 </div>
                <div className="reg-usr-ins">用户名: </div>
                <LinedInput onInput={syn(set_usrname)} className="lgn-ipt"/>
                <br></br>
                <div className="reg-usr-ins">密码: </div>
                <LinedInput type="password" onInput={syn(set_pwd1)} className="lgn-ipt"/>
                <div>
                    {
                        pwd1.length <= 8 && pwd1.length != 0 ? (<span style={{
                            color: "blanchedalmond",
                            fontSize: ".7rem",
                            fontWeight: "100"
                        }}>密码长度不能小于8</span>) : ""
                    }
                </div>
                <br></br>
                <div className="reg-usr-ins repeat-ins">重复密码: </div>
                 <LinedInput type="password" onInput={syn(set_pwd2)}/>
                <div>
                    {
                        
                        pwd1 != pwd2 && pwd1.length != 0 && pwd2.length != 0 ? (<span style={{
                            color: "blanchedalmond",
                            fontSize: ".7rem",
                            fontWeight: "100"
                        }}>两次密码不一致</span>) : ""
                    }
                </div>
                
                <br></br>

                <div className="lgn-btn" onClick={script}>注册</div>
            </Card>

            <Modal visible={showTip} onOk={closeTip} onCancel={closeTip}>
                用户名已经存在
            </Modal>
        </div>

    )


}
