import { HashRouter as Router,
    Redirect,
    Route} 
from "react-router-dom"
import Layout from "./Layout"
import TradeHistory from "./TradeHistory";
import Log from './Log';
import RSitu from './RSitu';
import CckOcu from '../../com/cck_ocu';

export default (props) => {
    return (
        <div>
            {/* router-list:
            /
            日志
            /log
            /r_situ
            房间占有情况
            /ocu
            价格管控
            /prc */}
            <Router>
                <Layout> 
                    <Route path="/trade/" exact component={TradeHistory}>
                    </Route>
                    <Route path="/trade/log" exact component={Log}>
                    </Route>
                    <Route path="/trade/r_situ" exact component={RSitu}>
                    </Route>
                     <Route path="/trade/ocu" exact component={CckOcu}>
                    </Route>
                    {/* <Redirect to="/trade/"></Redirect> */}
                </Layout>
            </Router>
        </div>
    )
}