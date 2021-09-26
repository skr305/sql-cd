import HtlItr from '../../com/hotel_intro';
import room from '../../api/request/room';
import { useHistory } from 'react-router-dom';
import get_ivk from '../../api/common/lib/get_ivk';
import { useEffect, useState } from 'react';
import rec from '../../api/request/rec';
import { get_usr, set_room } from '../../lib/session';
import './index.css';
import {Input } from 'antd';
import {FileSearchOutlined} from '@ant-design/icons'
import syn_ipt from '../../util/syn_ipt';
import LinedInput from '../../com/lined_input';

const view = (props) => {
    return (
        <div>
             <div className="rec-back-wrp">
                
                </div>

            <div style={{
                fontSize: "30px",
                fontWeight: "800",
                margin: "30px auto"
            }}>
                房源列表
            </div>

            <div style={{
                display: "flex",
                widths: "60vw",
                justifyContent: "space-around",
                margin: "3em 4em",
                
            }}>
                <div>
                    <FileSearchOutlined style={{fontSize: "3em"}}/>
                </div>
                <Input placeholder="输入搜索关键词" style={{width: "30vw"}} onChange={props.onSearchKeyChange}/>
                <div onClick={props.onSearch} className="lgn-btn"
                style={{
                    fontSize: "1.3em",
                    marginLeft: "30px !important",
                    position: "relative",
                    left: "-15em",
                    
                }}>搜索</div>
            </div>
            
            <div style={
                {
                            minWidth: "90vh",
                            display: "grid",
                            gridGap: "20em 5em",
                            gridTemplateRows: "10rem 10rem 10rem",
                            gridTemplateColumns: "repeat(3, 30%)",
                            margin: "30px 0 0 0",
                        

                            // marginTop: "75vh"
                }
            }>   
            
                
                {
                props.filtedRecs.map((val) => {
                    return ( 
                        <div key={val.id} style={{
                    
                            
                            
                        }}> 
                            { HtlItr({...val, onClick: props.onClick}) }
                        </div>
                        )
                    })
                }
            </div>
        </div>
    )
}


export default (props) => {
    
    const history = useHistory();

    const [recs, set_recs] = useState([]);
    const [filtedRecs, setFiltedRecs] = useState([]);

    const [searchKey, setSearchKey] = useState("");

    const onSearchKeyChange = syn_ipt(setSearchKey);

    const onSearch = () => {
        setFiltedRecs(recFilter( searchKey ));
    }

    const recFilter = (name) => {
        if(!name || name.length == 0) {
            return recs;
        }

        return recs.filter((rec) => {
            if(name.search(rec.pos) != "-1" || rec.name.search(name) != "-1") {
                return true;
            }
            return false;
        })
    }

    useEffect(() => {

        const on_suc = async (res) => {
            await set_recs(res.data);
            setFiltedRecs(res.data);
        }
        const api = get_ivk(rec)(on_suc);
        const usr = get_usr().usr;
        api(usr);
    }, [])






    const onClick = (id) => {
        set_room(id);
        // get_ivk(room)(get_on_suc(), get_on_fal(), get_on_err())(id);
        history.push("/room");
    }

    return view({
        onClick,
        filtedRecs,
        onSearchKeyChange,
        onSearch
    })
}