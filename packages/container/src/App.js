import React, {lazy, Suspense, useState}from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {StylesProvider, createGenerateClassName} from '@material-ui/core/styles';

import Header from './components/Header';
import Progress from './components/Progress';
//comento por que agrego componentes tipo lazy
//import MarketingApp from './components/marketingApp';
//import AuthApp from './components/AuthApp';
const MarketingLazy = lazy(() => import('./components/marketingApp'));
const AuthLazy = lazy(() => import('./components/AuthApp'));

const generateClassName = createGenerateClassName({
    productionPrefix: 'co',
});

export default() =>{
  const [isSignedIn, setIsSignedIn] = useState(false);
  return (
      <BrowserRouter>
        <StylesProvider generateClassName={generateClassName} >
          <div>
            <Header isSignedIn={isSignedIn} onSignOut={()=>setIsSignedIn(false)}/>
            <Suspense fallback={<Progress/>}>
            <Switch>

              <Route path="/auth">
                <AuthLazy onSignIn={() => setIsSignedIn(true)}/>
              </Route>
              <Route path="/" component={MarketingLazy}/>
            </Switch>
            </Suspense>
          </div>
        </StylesProvider>
      </BrowserRouter>
  );
};
