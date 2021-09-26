import { CloudSyncOutlined, WifiOutlined, FormatPainterFilled, 
FunnelPlotFilled, FireFilled, LayoutFilled} 
from '@ant-design/icons';

import './index.css'
import {useState} from 'react';
    /**
     * 0~5 
     * air-con, wifi, shower, wc, warm-water, fri
     */

export default (props) => {
    const SERVICE_LIST = [
        "空调",
        "wifi",
        "沐浴间",
        "独卫",
        "热水",
        "冰箱"
    ]

    
    const SERVICE_ICON = [
        <CloudSyncOutlined/>,
        <WifiOutlined/>,
        <FormatPainterFilled/>,
        <FunnelPlotFilled/>,
        <FireFilled/>,
        <LayoutFilled/>

    ]

    let [services, setServices] = useState("0".repeat(SERVICE_LIST.length));

    const onSelectService = (idx) => {
        

        const changeCodeAt = (index, code) => {
            return services.substr(0, idx) + code + services.substring(idx+1);
        }

        const onCode = services[idx] == "0" ? "1" : "0"
        
        const newServices = changeCodeAt(idx, onCode);
        setServices(newServices);
        props.onChange(newServices);
    }

    return  (
        <div className="service-wrp">
            {
                services.split("").map((service, idx) => {
                    
                    if(idx >= services.length) {
                        return
                    }

                    return (
                        <div className = {`${service == "1" ? "in-select" : ""} service-icon-wrapper`}
                        onClick={() => onSelectService(idx)}>
                            {SERVICE_ICON[idx]}
                            <span> {SERVICE_LIST[idx]} </span>
                        </div>
                    )
                })
            }
           
        </div>
    )
}