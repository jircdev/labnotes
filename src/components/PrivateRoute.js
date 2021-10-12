import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
// operador rest
export const PrivateRoute = ({ component: Component, ...rest }) => {
  const { currentUser } = useAuth();
  console.log('user', currentUser)

  return (
    <Route
      {...rest}
      render={props => {
        //por aca voy atacar con la longitud
        return currentUser ? <Component {...props} /> : <Redirect to='/'/>
      }}
    >

    </Route>
  )
}

