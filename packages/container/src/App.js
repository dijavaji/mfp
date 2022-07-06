import React, {lazy, Suspense, useState, useEffect}from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import {StylesProvider, createGenerateClassName} from '@material-ui/core/styles';
import {createBrowserHistory} from 'history';

import Header from './components/Header';
import Progress from './components/Progress';
//comento por que agrego componentes tipo lazy
//import MarketingApp from './components/marketingApp';
//import AuthApp from './components/AuthApp';
const MarketingLazy = lazy(() => import('./components/marketingApp'));
const AuthLazy = lazy(() => import('./components/AuthApp'));
const DashboardLazy = lazy(() => import('./components/DashboardApp'));
import NotFound from './components/NotFound';

const generateClassName = createGenerateClassName({
    productionPrefix: 'co',
});

const history = createBrowserHistory();

export default() =>{
  const [isSignedIn, setIsSignedIn] = useState(false);
  useEffect(()=>{
    if(isSignedIn){
      history.push('/dashboard');
    }
  },[isSignedIn]);
  return (
      //<BrowserRouter> cambio para poner agregar navegacion protegida
      <Router history={history}>
        <StylesProvider generateClassName={generateClassName} >
          <div>
            <Header isSignedIn={isSignedIn} onSignOut={()=>setIsSignedIn(false)}/>
            <Suspense fallback={<Progress/>}>
            <Switch>

              <Route path="/auth">
                <AuthLazy onSignIn={() => setIsSignedIn(true)}/>
              </Route>
              <Route path="/dashboard">
                {!isSignedIn && <Redirect to="/" />}<DashboardLazy/>
              </Route>
              <Route path="/" component={MarketingLazy}/>
              <Route path="*" component={NotFound} />
            </Switch>
            </Suspense>
          </div>
        </StylesProvider>
      </Router>
  );
};
