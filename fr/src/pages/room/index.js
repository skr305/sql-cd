
import { useEffect, useState } from 'react';
import get_ivk from '../../api/common/lib/get_ivk';
import room from '../../api/request/room';
import DatSel from '../../com/dat_sel';
import Ser from '../../com/ser';
import { get_room, set_room_info } from '../../lib/session';
import {HighlightTwoTone} from '@ant-design/icons'
import './index.css'
const view = (props) => {
    return (
        <>
        {
        
            (() => {
                if(props.loading) {
                    return ""
                }

                return ( 
                <div style={{overflowY: "scroll !important", overflowX: "hidden"}}>
                    <div className="room-img-wrp">
                        <div className="room-img-head">
                            
                            <img src={props.hed_img} className="head-img"/> 
                            
                        </div>
                        <div className="room-img-list">
                            {
                                props.imgs.map((data,idx) => {
                                    return (<div className="room-img-wrp"><img src={data} key={idx} className="room-img"/> </div>)
                                })
                            }
                        </div>
                    </div>
                    
                    <div className="own">
                        <div className="own-name">房东: {props.own} </div>
                    </div>

                    <div className="itr" style={{
                        textAlign: "left",

                        paddingBottom: "20px",
                        border: "solid 1px black"
                    }}>
                        <div style={{
                            fontSize: "2rem",
                            fontWeight: "100",
                            marginBottom: "1em"
                        }}>简介</div>
                        <span className="itr-name"> {props.r_name} </span>
                        <span className="itr-txt"> {props.itr} </span>
                    </div>

                    
                    <div className="ins" style = {{
                        
                        borderBottom : "5px solid black",
                        marginBottom : "45px",
                        marginLeft :  "20px"

                    }}>
                        <p style={{
                            fontSize: "25px",
                            color: "rgb(96, 96, 228)",
                            fontWeight: "800",
                            textAlign: "left"
                        }}> 说明: </p>
                        {
                            Object.keys(props.ins).map(key => {
                                return (
                                    <div key={key} style ={{
                                        textAlign: "left",
                                        fontSize: "30px",
                                        padding: "10px"
                                    }}> 
                                        <span className="ins_tit" style={{
                                            fontSize: "20px",
                                            fontWeight: "700"
                                        }}> {key} : </span>
                                        <span className="ins_txt" style={{
                                            fontSize: "21px",
                                            fontWeight: "100"
                                        }}>{ props.ins[key] }</span>
                                    </div>
                                )
                            })
                        }
                    </div>

                    <div className="ser-list-ins">
                        服务列表:
                    </div>
                    <div className="ser-body" style={{
                        textAlign: "left"
                    }}>
                        <Ser codes={props.ser}/>
                    </div>
                   
                    <DatSel price={props.prc} r_name={props.r_name}/>
                    
                    <div style={{
                        fontSize: "17px",
                        fontWeight: "100",

                        textAlign: "left",

                        width: "50vw",
                        lineHeight: "1.3em",

                        marginTop: "3em",
                        marginLeft: "20px",

                        padding: "10px",
                        paddingLeft: "30px",

                        borderLeft: "solid 1px black",
                        borderTop: "solid 1px black"
                    
                    }}>
                        <div style={{
                            fontSize: "25px",
                            fontWeight: "10px",
                            lineHeight: "2em"
                        }}>
                            用户须知
                        </div>
                        <HighlightTwoTone style={{
                            fontSize: "30px"
                        }}/>
                        
                        <div style={{
                            fontSize: "20px",
                            fontWeight: "700",
                            marginTop: "30px"
                        }}>  
                            旅行时契约
                        </div>
                        退房时间通常为第二天上午 如需提前离开 
                        可与平台商家团体沟通 
                        商品具有交易属性 故此适用于各种同类型法规
                        用户可通过正当渠道进行反馈和索权
                        平台对经管用户具有约束权 但同时也在一定程度内保有
                        经管用户的正当权益

                        <div style={{
                            fontSize: "20px",
                            fontWeight: "700",
                            marginTop: "30px"
                        }}>  
                            退房
                        </div>

                        用户退房如在14点前进行 则相应的清洁费将予以退回
                         且由此产生的金额将有商家交易本部进行退回
                    </div>
                </div>
            )
        })()
    }
    </>)
}

        
        



export default (props) => {

    useEffect(() => {
        const suc = async (res) => {
            const data = res.data;

            for(let i=data.imgs.length; i<4; i++) {
                data.imgs.push("")
            }
            
            set_det(data);
            set_loading(false);

            set_room_info(res.data)
    
        }
    
        const api = get_ivk(room)(suc);
    
        api(get_room());
    }, [])

    

    const [loading, set_loading] = useState(true); 
    const [det, set_det] = useState({});

    

    return view({...det, loading});
}