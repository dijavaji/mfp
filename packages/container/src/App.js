import React, {lazy, Suspense}from 'react';
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
  return (
      <BrowserRouter>
        <StylesProvider generateClassName={generateClassName} >
          <div>
            <Header/>
            <Suspense fallback={<Progress/>}>
            <Switch>
              <Route path="/auth" component={AuthLazy}/>
              <Route path="/" component={MarketingLazy}/>
            </Switch>
            </Suspense>
          </div>
        </StylesProvider>
      </BrowserRouter>
  );
};
