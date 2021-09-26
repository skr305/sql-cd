import { useHistory } from "react-router-dom"
import { Layout } from "antd"
import './index.css'

export default (props) => {
    
    const history = useHistory();
    const tabList = [
        "贸易历史",
        "销售日志",
        "资源情况",
    ];

    const tabRouteExe = (idx) => {
        const path = [
            "/trade/",
            "/trade/log",
            "/trade/ocu",
            "/trade/prc"
        ]

        history.replace(path[idx]);
    }

    return (
        <div>
            <Layout.Header style={{
                background: "transparent",
                display: "flex",
                justifyContent: "space-around"
            }}>

                {
                    tabList.map((tab,idx) => {
                        return (
                            <div onClick={() => tabRouteExe(idx)}
                            className="lgn-btn tab-btn">
                                {tab}
                            </div>
                        )
                    })
                }
            </Layout.Header>
            {props.children}
        </div>
    )
}