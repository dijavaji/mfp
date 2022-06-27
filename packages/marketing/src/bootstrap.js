import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';


//funcion mount para iniciar la aplicacion
const mount = (el) =>{
    ReactDOM.render(
      <App/>, el
    );
};

//si nosotros estamos en development aislado llamar a mount inmediatamente
if(process.env.NODE_ENV === 'development'){
  const devRoot = document.querySelector('#_marketing-dev-root');
  if(devRoot){
    mount(devRoot);
  }
}

//nosotros estamos corriento mediante el container entonces deberiamos importar la funcion mount
export {mount};
