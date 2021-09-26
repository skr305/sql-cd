import { useState } from "react"
import { notification } from "antd";
import syn_ipt from "../../util/syn_ipt";
import get_ivk from "../../api/common/lib/get_ivk";
import set_homPwd from '../../api/request/set_homPwd';
import { useHistory } from "react-router-dom";
import { get_usr } from "../../lib/session";
import PayIpt from "../../com/hom/pay_ipt";

export default (props) => {

    const [firstPwd, setfirstPwd] = useState("");
    const [secondPwd, setSecondPwd] = useState("");
    const history = useHistory();

    const [iptCnt, setIptCnt] = useState(1);
    const [hasSuc, setHasSuc] = useState(false);


    const onFirst = () => {
        setIptCnt(2);
    }

    const onSet = () => {
        if(firstPwd != secondPwd) {
            notification.open({
                message: "两次密码不一致"
            })
        }

        const on_suc = () => {
            setHasSuc(true);
            setTimeout(() => {
                history.replace("/rec");
            }, 1500)
        }

        const hom_id = get_usr().hom_id;
        const api = get_ivk(set_homPwd)(on_suc);
        api({hom_id, new_pwd: firstPwd});
    }

  


    return (<div>
        {
            iptCnt == 1 ? 
            (<div style={{
                margin: "0 auto",
                marginTop: "23vh"
            }}> 
                <div className="his-item-ins">请输入两次新密码</div> 
                <PayIpt onInput={setfirstPwd}/>
                <div className="lgn-btn" onClick={onFirst}>确认</div>
                
                
            </div>) :
            (<div style={{
                margin: "0 auto",
                marginTop: "23vh"
            }}> 
                <PayIpt onInput={setSecondPwd}/>
                <div className="lgn-btn" onClick={onSet}>确认</div>
                
            </div>)
        }
        { hasSuc ? <div className="pay-tip suc-tip"> 设置成功,2s后重定向到首页 </div>  : ""}
    </div>)

}