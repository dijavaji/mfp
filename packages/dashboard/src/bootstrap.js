//librerias de vue
import {createApp} from 'vue';
import Dashboard from './components/Dashboard.vue';


//funcion mount para iniciar la aplicacion
const mount = (el) =>{
    const app = createApp(Dashboard);
    app.mount(el);
};

//si nosotros estamos en development aislado llamar a mount inmediatamente
if(process.env.NODE_ENV === 'development'){
  const devRoot = document.querySelector('#_dashboard-dev-root');
  if(devRoot){
    mount(devRoot);
  }
}

//nosotros estamos corriento mediante el container entonces deberiamos importar la funcion mount
export {mount};
