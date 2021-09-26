import React, { lazy, Suspense } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';




const IndexContainer = (props) => {

}

const Index = lazy(() => import("./lib/index"));
const Login = () => <>Login Here</>;
const Score = lazy(() => <>Score Here</>);
const _2D = () => <> 244 </>

const LoadingPage = (
  <div
    style={{
      width: '100%',
      top: '40%',
      position: 'absolute',
      margin: '0 auto',
      textAlign: 'center',
    }}>
    <p>加载中...</p>
  </div>
);

function App() {
  return (
    <Router>
      <Suspense fallback={LoadingPage}>
        <Switch>
            <Route path='/index' component={Index} />
            <Route path='/login' component={Login} />
            <Route path='/score' component={Score} />
            <Route path="/2d" component={_2D}></Route>
            <Redirect to='/index' />
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
