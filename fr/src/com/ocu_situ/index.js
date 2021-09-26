import {useEffect, useState} from 'react'
import { Skeleton } from 'antd';
import ocu_situ from '../../api/request/ocu_situ';
import get_ivk from "../../api/common/lib/get_ivk";
import './index.css'

export default (props) => {

    const {r_id, in_date, out_date} = props;


    /** data references to the back
     * {[head:string]: Array<number>}
     */
    const [situationData, setSituationData] = useState({});
    const [inLoad, setInLoad] = useState(true);

    useEffect(() => {
        const on_suc = (res) => {
            console.log(res.data);
            setSituationData(res.data);
            setInLoad(false);
        }

        const on_unFind = () => {
            setSituationData({})
        }

        const api = get_ivk(ocu_situ)(on_suc, on_unFind, on_unFind);
        api({r_id, in_date, out_date});
    }, [r_id, in_date, out_date])

    return (
        <div className={"ocu-total"}>
            {
                inLoad ?
                <Skeleton/> :
                (

                 
                    Object.keys(situationData).map(head => {
                        return (
                            <div className={"single-rcode-wrp"} style={{
                                
                            }}> 
                                <span style={{
                                    marginLeft: "20vw"
                                }}> { head } </span>
                                <div className={""} style={{
                                    display: "flex",
                                    width: "30vw",
                                    margin: "3em auto",
                                    justifyContent: "space-around",
                                    minHeight: "10vh",
                                    border: "1px soild black",
                                    marginLeft: "20vw"
                                }}> 
                                    {
                                        situationData[head].map(singleOcu => {
                                            return (<div className={`${singleOcu == 0 ? "ocu-idle" : "ocu-in"} single-ocu-wrp`}> 
                                                
                                            </div>)
                                        })
                                    }
                                </div>
                            </div>
                        )
                    })
                    
                )
            }
        </div>
    )
}