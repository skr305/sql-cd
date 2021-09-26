import { get_usr, set_usr } from "../../lib/session"
import { Avatar, notification } from 'antd';
import { BulbOutlined } from '@ant-design/icons';
import Upload from '../../com/upload';
import get_ivk from "../../api/common/lib/get_ivk";
import update_ava from "../../api/request/update_ava";
import { useEffect, useState } from "react";
import bus from "../../util/bus";
import { useHistory } from "react-router-dom";
import './index.css'
export default () => {
    
    const _history = useHistory()

    const [cacheAvatar,setCacheAvatar] = useState(null);    
    console.log(get_usr())
    const usr = get_usr().usr;
    const hom_id = get_usr().hom_id;

    useEffect(() => {
        setCacheAvatar(get_usr().avatar || null)
    }, [])

    const onAvatarUpload = (FileList) => {
        setCacheAvatar(FileList[0]);
    }



    const onUpdateAvatar = () => {
        const on_suc = () => {
            notification.open({
                message: "上传成功"
            })

            bus.emit("setAva", cacheAvatar);

            const rawUsr = get_usr();
            set_usr({avatar: cacheAvatar, usr: rawUsr.usr, hom_id: rawUsr.hom_id});
        }
        const api = get_ivk(update_ava)(on_suc);
        api(usr, cacheAvatar);
    }

    const onSetPwd = () => {
        _history.push('/vali_pwd')
    }

    return (
        <div className="per-info-wrp">
            <img className="avatar" src={cacheAvatar}/> 

            <div> 
                <Upload maxCount={1} onChange={onAvatarUpload}/>
                <span onClick={onUpdateAvatar} className="his-item-ins"> 更改头像 </span>
            </div>
            

            <div className="his-item-body"> 您好! {usr} </div>

            <div className="his-item-ins"> HOM_ID: {hom_id} </div>

            <div className="his-item-ins" style={{
                borderBottom: "solid 1px black",
                maxWidth: "5em"
            }} onClick={onSetPwd}> 设置密码 </div>
        </div>
    )
}