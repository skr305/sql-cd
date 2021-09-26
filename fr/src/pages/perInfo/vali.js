import { useState } from "react"
import { notification } from "antd";
import syn_ipt from "../../util/syn_ipt";
import get_ivk from "../../api/common/lib/get_ivk";
import vali_hom from '../../api/request/vali_hom';
import { useHistory } from "react-router";
import { get_usr } from "../../lib/session";
import PayIpt from "../../com/hom/pay_ipt";

export default (props) => {

    const [curPwd, setCurPwd] = useState("");
    const history = useHistory();
    
    const onVali = () => {
        const on_err = () => {
            notification.open({
                message: "错误的密码"
            })

        }
        const on_suc = (res) => {
            if(res.data) {
                history.push("/set_pwd");
                return;
            }

            on_err();
            
        }

        const api = get_ivk(vali_hom)(on_suc, on_err, on_err);
        api({usr: get_usr().usr, pwd: curPwd});
    }


    return (<div style={{
        margin: "0 auto",
        marginTop: "23vh"
    }}> 
        <PayIpt onInput={setCurPwd}/>
        <div className="lgn-btn" onClick={onVali}>确认</div>
        <div className="his-item-ins">
           这是一次危险操作 请输入你的Hom密码
        </div>
    </div>)

}