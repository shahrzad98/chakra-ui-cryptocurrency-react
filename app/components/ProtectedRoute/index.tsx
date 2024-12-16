import React from "react";
import { Route, Redirect } from "react-router-dom";
import TokenManager from "../../utils/TokenManager";

const ProtectedRoute = ({ component: Component, code, ...rest }: any) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (TokenManager.get().Token) {
          return <Component {...rest} {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  from: props.location,
                  code,
                },
              }}
            />
          );
        }
      }}
    />
  );
};

export default ProtectedRoute;
