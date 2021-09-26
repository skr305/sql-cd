import { useHistory } from "react-router-dom"
import {
    HashRouter as Router,
    Redirect,
    Route,
    Switch,
  } from 'react-router-dom';
  

export default () => {
    const history = useHistory();

    const toLogin = () => {
        history.push("/login");
    }

    return (
        <>
            <div onClick = {toLogin}>233 </div>
            <Router>
                
                <Route path="/live">
                    <Live></Live>
                </Route>
                <Route path="/2d">
                    <_2D></_2D>
                </Route>
                <Redirect to='/live'/>
            </Router>
        </>
    )
}


const Live = () => {
    const history = useHistory();
    const to2D = () => {
        history.push("/2d")
    }

    return (
        <div onClick= {to2D}>
            233
        </div>
    )
}

const _2D = () => <div>_2D</div>