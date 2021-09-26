import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom";
import { Skeleton, Modal } from "antd";
import get_ivk from "../../api/common/lib/get_ivk";
import { get_usr, set_r_situ } from "../../lib/session";
import own_room from "../../api/request/own_room";
import LinedInput from '../../com/lined_input';
import syn_ipt from "../../util/syn_ipt";
import add_discount from '../../api/request/add_discount';
import drop_discount from '../../api/request/drop_discount';
import get_discount from '../../api/request/get_discount';

export default (props) => {

    const [currentAddDiscountRID,setCurrentAddDiscountRID] = useState("");
    const [currentAddDiscountIdx, setCurrentAddDiscountIdx] = useState(0);



    const history = useHistory();
    const [roomList ,setRoomList] = useState([]);
    const [loadDone, setLoadDone] = useState(false);
    const [discounts, setDiscounts] = useState([]);
    
    /** submit the cache of the addDiscountModal */
    
    const [discountName, setDiscountName] = useState("");
    const [discountExtent, setDiscountExtent] = useState(0);
    
    const addDiscount = (r_id, room_idx) => {
        setCurrentAddDiscountIdx (room_idx);
        setCurrentAddDiscountRID (r_id);
        openAddDiscountModal();
    }

    const onUploadDiscount = () => {

        const loadData = {r_id: currentAddDiscountRID, d_id: "", d_name:discountName, extent: discountExtent};

        const on_suc = (res) => {
            const newDiscounts = discounts;
            newDiscounts[currentAddDiscountIdx] .push({...loadData, d_id: res.data})
            setDiscounts(newDiscounts);
        }
        const api = get_ivk(add_discount)(on_suc);
        api(loadData);
    }

    
    /** addDiscountModal */
    const [showAddDiscountModal, setShowAddDiscountModal] = useState(false);


    const openAddDiscountModal = () => {
        setShowAddDiscountModal(true);
    }

    const closeAddDiscountModal = () => {
        setShowAddDiscountModal(false);
    }


    /** drop the discount */

    const dropDiscount = (d_id, d_idx, r_idx) => {
        const on_suc = (res) => {
            discounts[r_idx].splice(d_idx, 1);
        }

        const api = get_ivk(drop_discount)(on_suc);
        api(d_id);
    }



    //getDiscountsByRID
    const getDiscountsByRID = (r_id) => {
        return new Promise((reslove, reject) => {
            const on_suc = (res) => {
                reslove(res.data);
            }

            const api = get_ivk(get_discount)(on_suc);
            api(r_id);
        })
    }


    useEffect(() => {
        const on_suc = async (res) => {
            const roomList = res.data;
            setRoomList(roomList);

            const newDiscounts = [];

            for(let i=0; i<roomList.length; i++) {
                newDiscounts.push([]);
                const result = await getDiscountsByRID(roomList[i].id);
                newDiscounts[i] = result;
            }
            

            
            setDiscounts(newDiscounts);

            console.log(newDiscounts);

            setLoadDone(true);

        }

        //get the room list 
        const api = get_ivk(own_room)(on_suc);
        api(get_usr().usr);
    }, []);

    const findRoomSitu = (id) => {
        set_r_situ(id);
        history.push("/trade/r_situ");
    }


    return (
        <div className="log-total">
            
            {
               loadDone ? "" : <Skeleton/>
            }
                        
            <div className="log-list-body">
                {
                    roomList.map((room, idx) => (<div className="his-wrp"> 
                        <div className="his-item-ins"> {idx}. </div>
                        <img src={room.hed_img} style={{
                            objectFit: "cover",
                            width: "10em",
                            height: "10em"
                        }}/>
                        <div className="his-item-body"> 名称: {room.r_name} </div>
                        <div className="his-item-ins"> ID: {room.id} </div>
                        <div className="his-item-ins"> 价格: ￥{room.prc} </div>
                        <div className="his-item-ins"> pos: {room.pos} </div>
                        {
                            discounts[idx] ?
                            discounts[idx].map((dis, d_idx) => {
                                return (<div className="discount-item his-item-ins"> 
                                    <div className="his-item-body"> {dis.d_name} </div>
                                    <div> {dis.extent} % </div>
                                    <div className="lgn-btn" onClick={() => dropDiscount(dis.d_id, d_idx, idx)}> 撤销 </div>
                                </div>)
                            }) : ""
                        }

                        
                        <div className="lgn-btn"  onClick={() => findRoomSitu(room.id)}> 
                            查看详情
                        </div>
                        
                        <div className="new-discount lgn-btn" onClick={() => addDiscount(room.id, idx)}> 
                            添加新的折扣
                        </div>

                        
                    </div>)
                    )

                    
                }

                <Modal visible={showAddDiscountModal} onOk={closeAddDiscountModal} onCancel={closeAddDiscountModal}>
                    <LinedInput label={"折扣名称"} onChange={syn_ipt(setDiscountName)}/>
                    <LinedInput label={"折扣力度/%"} type="number" onChange={syn_ipt(setDiscountExtent)}/>

                    <div className="lgn-btn" onClick={onUploadDiscount}> 确认折扣 </div>
                </Modal>
            </div>
        </div>
    )
}