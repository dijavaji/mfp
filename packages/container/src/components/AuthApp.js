import {mount} from 'auth/AuthApp';

import React, {useRef, useEffect} from 'react';
import {useHistory} from 'react-router-dom';

export default ({onSignIn}) => {
  const ref = useRef(null);
  const history = useHistory();

  useEffect(() => {
    const {onParentNavigate} =mount(ref.current, {
      initialPath: history.location.pathname,
      onNavigate: ({pathname: nextPathname})=> {
      console.log('el container observo navegacion en auth');
      console.log(location);
      const {pathname} = history.location;
      if(pathname !== nextPathname ){
          history.push(nextPathname);
      }
    },
    //agrego metodo usuario logueado
    //onSignIn: ()=>{console.log('usuario logueado'); onSignIn();},
    onSignIn,
    });
    history.listen(onParentNavigate);
  },[]);
  return <div ref={ref}/>
};
