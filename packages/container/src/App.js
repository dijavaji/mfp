import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import {StylesProvider, createGenerateClassName} from '@material-ui/core/styles';

import MarketingApp from './components/marketingApp';
import Header from './components/Header';

const generateClassName = createGenerateClassName({
    productionPrefix: 'co',
});

export default() =>{
  return (
      <BrowserRouter>
        <StylesProvider generateClassName={generateClassName} >
          <div>
            <Header/>
            <MarketingApp/>
          </div>
        </StylesProvider>
      </BrowserRouter>
  );
};
