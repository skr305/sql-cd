import { Modal, Card } from "antd";
import { useEffect, useState } from "react";
import get_ivk from "../../api/common/lib/get_ivk"
import { get_usr } from "../../lib/session";


export default () => {

    const [mes, set_mes] = useState([]);
    
    /** type=4 means unvisible */
    const [curItem, setCurItem] = useState({type: 4});

    const [hand, setHand] = useState(false);

    const [remain, setRemain] = useState({});

    const [r_id, set_r_id] = useState("");

    useEffect(() => {
        const on_suc = (res) => {
            set_mes(res.data);
        }   

        const api = get_ivk(get_mes)(on_suc);

        api(get_usr().usr);
    }, [])


    const detail  = (item) => {
        setCurItem(item)
    }






    return (
        <>
            <div>
                {
                    /** item with 
                     * id, type, content, sender
                     */
                    mes.map(item => {
                        return (
                            <div onClick={() => detail(item)}>
                                <div>{item.type == 0 ? "换房" : "退房"} </div>
                                <div> { item.content } </div>
                                <div> {item.sender} </div>
                            </div>
                        )
                    })
                }                
            </div>

            <Modal visible={curItem.type == 4}>
                {
                    (() => {
                        if(curItem.type == 0) {
                            let {r_code, r_id, cause} = JSON.parse(curItem.content);
                            return (
                                <Card>
                                    <div> 房间id: { r_id} </div>
                                    <div> 原房间号: {r_code} </div>
                                    <div> 原因: {cause} </div>

                                    <div onClick={}>处理请求</div>
                                </Card>
                            )
                        }
                    })()
                }
            </Modal>

            <Modal visible={hand}>
                {
                    Object.keys(remain).map(head => {
                        return (
                            <div>
                                 { head }
                                 <div style={{
                                     display: "flex",
                                     flexDirection: "row",
                                     maxWidth: "150px"
                                 }}>
                                    {
                                        remain[head].map((ocu, idx) => {
                                            return (<div onClick={() => chooseDis(head, idx)}>
                                                <div style={{
                                                    color:  ocu ? "red" : "whitesmoke",
                                                    width: "30px",
                                                    height: "30px"
                                                }}> 
                                                </div>
                                                <div> { idx } </div>
                                            </div>)
                                        })
                                    }
                                 </div>
                            </div>
                        )
                    })
                }
            </Modal>
        </>
    )
     
}