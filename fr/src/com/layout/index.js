import { useHistory, useLocation } from "react-router-dom"
import { Menu,Avatar, Layout, Dropdown, Image} from "antd";
import { ExperimentOutlined, MobileOutlined, BulbOutlined, MailOutlined, PoweroffOutlined} from '@ant-design/icons';
import { get_usr } from "../../lib/session";
import { useEffect, useState } from "react";
import bus from "../../util/bus";
import './index.css'
export default (props) => {

    const [img, setImg] = useState("-1");

    useEffect(() => {
        bus.on("loadPerInfo", () => {
            console.log(get_usr().avatar);
            setImg(get_usr().avatar)
        })
    
        bus.on("setAva", (img)=> {
            setImg(img)
        })

        if(get_usr()) {
            setImg(get_usr().avatar || null);
        }

    }, [])
    

    const onMessage = () => {
        history.push("/mes");
    }

    const onLoginOut = () => {
        history.replace("/")
    }

    const onPerInfo = () => {
        history.push("/per_info");
    } 

    const onHistory = () => {
        history.push("/history")
    }

    const onTrade = () => {
        history.push("/trade");
    }

    const onBecOwn = () => {
        history.push("/becown")
    }

 

    const menu = (
        <Menu>
          <Menu.Item icon={<ExperimentOutlined />}>
            <a target="_blank" rel="noopener noreferrer" onClick={onBecOwn}>
                成为房东
            </a>
          </Menu.Item>
          <Menu.Item icon={<MobileOutlined />}>
            <a target="_blank" rel="noopener noreferrer" onClick={onHistory}>
               我的历史
            </a>
          </Menu.Item>

          <Menu.Item icon={<MobileOutlined />}>
            <a target="_blank" rel="noopener noreferrer" onClick={onTrade}>
               贸易详情
            </a>
          </Menu.Item>
          
        </Menu>
      );

    const location = useLocation();
    const history = useHistory();

    const children = props.children;

    

    return (
        <div>
            {
                (() => {
                    const pathname = location.pathname
                    if(pathname != "/" && pathname != "/reg") {
                        
                        if(!get_usr()) {
                            history.replace("/");
                            return;
                        }

                      
                        return (
                            <div >
                                <Layout.Header style={{
                                  display: "flex",
                                  background: "transparent"
                                }}>
                                    <div style={{
                                    
                                    }} className="ote-img">
                                    <div style={{
                                        fontWeight:"100",
                                        marginLeft: "2em",
                                        lineHeight: "2em",
                                        fontSize: "19px",
                                        minWidth: "6em"
                                    }}>水獭找房</div>

                                    </div>
                                    <Dropdown overlay={menu} style={
                                        {}
                                    } > 
                                    {/* <img src={img || "../../assets/rec.jpg"}
                                     onClick={onPerInfo}
                                    style={{
                                        marginLeft: "75vw"
                                    }}/> */}
                                        <Avatar 
                                        icon={<BulbOutlined/>}
                                        src={img}
                                        onClick={onPerInfo} style={{
                                            marginLeft: "74%",
                                            marginRight: "3rem",
                                            marginTop: ".7rem",
                                            border: "solid 1px white",
                                        }}
                                        size= "large"/> 
                                    </Dropdown>

                                    <div onClick={onLoginOut}> 
                                        <PoweroffOutlined style={{
                                            color: "black",
                                            fontSize: "2rem",
                                            fontWeight: "100",
                                            marginRight: "1.6em"
                                        }}/>
                                    </div>
                                    
                                    <div onClick={onMessage}> 
                                        <MailOutlined style={{
                                            color: "black",
                                            fontSize: "2rem",
                                            fontWeight: "100"
                                        }}/>
                                    </div>
                                </Layout.Header>

                                { children }
                            </div>
                        )
                    }

                    return <> {children} </>
                }) ()
            }
        </div>
    )
}

