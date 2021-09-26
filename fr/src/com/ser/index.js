import { CloudSyncOutlined, WifiOutlined, FormatPainterFilled, 
FunnelPlotFilled, FireFilled, LayoutFilled, MacCommandFilled} 
from '@ant-design/icons';

import './index.css';

/**
 * 0~5 
 * air-con, wifi, shower, wc, warm-warter, fri
 */
const get_service_icon = (code) => {

    switch(code) {
        case 0: {
            return (
                <CloudSyncOutlined />
            )
        }
        case 1: {
            return (
                <WifiOutlined />
            )
        }
        case 2: {
            return (
                <FormatPainterFilled />
            )
        }
        case 3: {
            return (
                <FunnelPlotFilled size="large"/>
            )
        }
        case 4: {
            return (
                <FireFilled />
            )
        }
        case 5: {
            return (
                <LayoutFilled />
            )
        }
        default: {
            return (
                <MacCommandFilled />
            )
        }
    }
};



/**
 * 0~5 
 * air-con, wifi, shower, wc, warm-warter, fri
 */
 const get_services = (props) => {
    const codes = props.codes
    const services = ["空调", "wifi", "沐浴", "独立卫生间", "水暖", "冰箱"]

    return ( 
        <div className="ser-icns">
            {
                codes.map((cod, idx) => {
                    if(cod == 1) {
                        return (
                            <div className="ser-block" key={idx}>
                                <div className="ser-icn-wrp">{ 
                                    get_service_icon(idx) 
                                } </div>
                                
                                <span className="ser-txt">
                                    { services[idx] }
                                </span>
                            </div>
                        )
                    }
                })
            }
        </div> 
    )
};


export default get_services;