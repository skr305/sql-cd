import './App.css';
import { useEffect, useState } from 'react';
import { sub } from './util/lod_sta';
import init from './bootstrap/router';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch
} from 'react-router-dom';

import { notification, Spin } from 'antd';

import Login from './pages/auth/login';
import Rec from './pages/rec';
import Room from './pages/room';
import Reg from './pages/auth/reg';
import History from './pages/history';
import Layout from './com/layout';
import Becown from './pages/becown';
import Book from './pages/bok';
import Mes from './pages/mes';
import Trade from './pages/trade/index';
import PerInfo from './pages/perInfo/index';
import SetPwd from './pages/perInfo/setPwd';
import ValiPwd from './pages/perInfo/vali';

import bus from './util/bus';

function view (props) {
  return (
    <div className="App">
      
          {
            props.loading ? 
            <div>
              <Spin spinning={props.loading}>加载..</Spin>
            </div>
            :
            ""
          }
          {
            <Router>
              <Layout>
                    <Route component={Login} exact path="/"
                    ></Route>
                    <Route component={Rec} path="/rec">
                    </Route>
                    <Route component={Room} path="/room">
                    </Route>
                    
                    <Route component={Reg} path="/reg">
                    </Route>

                    <Route component={History} path="/history">
                    </Route>
                    <Route component={Becown} path="/becown">
                    </Route>
                    <Route component={Book} path="/book">
                    </Route>

                    <Route component={Trade} path="/trade">
                    </Route>

                    <Route component={Mes} path="/mes">
                    </Route>

                    <Route component={PerInfo} path="/per_info">
                    </Route>

                    <Route component={ValiPwd} path="/vali_pwd">
                    </Route>

                    <Route component={SetPwd} path="/set_pwd">
                    </Route>
                    {/* <Redirect to="/"></Redirect> */}
                    </Layout>
            </Router>
           
          }

    </div>
  );
}


const App = () => {


  const suc_noti = (mes = "加载成功") => {


    notification.open({
      message: mes
    })

  } 

  const fal_noti = (mes = "加载失败") => {


    notification.open({
      message: mes
    })

  }

  const err_noti = (mes = "加载错误") => {

    notification.open({
      message: mes
    })

  }
  
  useEffect(() => {
    bus.on("suc_noti", suc_noti);
    bus.on("fal_noti", fal_noti);
    bus.on("err_noti", err_noti);


  }, [])
  const [loading, set_loading] = useState(false);


  sub(set_loading);

  return view({
    loading,
    init
  })
}

export default App;
