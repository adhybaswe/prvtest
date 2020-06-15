import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ children, authed, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      authed
        ? children
        : <Redirect to="/login" />
    )}
  />
);

export default PrivateRoute;