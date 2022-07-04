import React from 'react';
import ReactDOM from 'react-dom';
import { createMemoryHistory } from 'history';
import App from './App';


//funcion mount para iniciar la aplicacion
const mount = (el, { onNavigate }) =>{
  const history = createMemoryHistory();
  //en la llamada a la aplicacion creo un objeto history cada vez que cambia la url
  if(onNavigate){
      history.listen(onNavigate);
  }

    ReactDOM.render(
      <App history={history} />, el
    );

    //comunica informacion al container padre
    return {
      onParentNavigate({pathname : nextPathname}){
        const {pathname} = history.location;
        console.log('container recien navegando');
        console.log(location);
        if(pathname !== nextPathname){
          history.push(nextPathname);
        }
      }
    }
};

//si nosotros estamos en development aislado llamar a mount inmediatamente
if(process.env.NODE_ENV === 'development'){
  const devRoot = document.querySelector('#_marketing-dev-root');
  if(devRoot){
    mount(devRoot, {});
  }
}

//nosotros estamos corriento mediante el container entonces deberiamos importar la funcion mount
export {mount};
