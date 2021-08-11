import { Redirect, Route } from "react-router-dom";
import { isAuthenticated } from "../utils/session";

const PrivateRoute = (props: any) => {
  const { component: Component, path } = props;
  return (
    <Route
      path={path}
      render={(props) => {
        return !!isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        );
      }}
    />
  );
};

export default PrivateRoute;
