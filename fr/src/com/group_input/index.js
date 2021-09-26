import { useState } from "react"
import { Input } from 'antd';
import './index.css'
import LinedInput from "../lined_input";

export default (props) => {
    const [groups, setGroups] = useState([]);
    
    const onChange = (e, groupIdx, idx) => {
        groups[groupIdx][idx] = e.target.value;
        console.log(groups);
        setGroups(groups);
        props.onChange(groups);
    }

    const pushGroups = () => {
        const newGroup = []
        for(let i=0; i<props.labels.length; i++) {
            newGroup.push("")
        }

        setGroups(groups.concat([newGroup]));
    }

    return (
        <div className="group-ipt-total">
            {
                groups.map((group, groupIdx) => {
                    return ( <div className="one-group">  {props.labels.map((label, idx) => {


                        // console.log(group)
                        return (<div key={idx} className="group-ipt-wrp">
                            <span className="group-ipt-label"> {label} </span>
                            
                            <LinedInput className="group-ipt-item" textAlign="center" type={(props.specifiedInputs && props.specifiedInputs[idx]) || "text"} onChange={(e) => onChange(e,groupIdx, idx)}></LinedInput>
                            
                        </div>)
                        
                    })}</div>)
                })
            }

            <div onClick={pushGroups} className="add-btn lgn-btn">添加</div>
        </div>
    )
}