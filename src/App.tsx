import { Suspense } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoute";
import Login from "./pages/Login";
import Container from "./components/Container";
import { isAuthenticated } from "./utils/session";
import "./App.css";

const App = (props: any) => {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <Router basename="example">
        <Switch>
          <Route
            path="/login"
            exact
            render={(props) => {
              return !!isAuthenticated() ? (
                <Redirect to="/" />
              ) : (
                <Login {...props} />
              );
            }}
          />
          <PrivateRoute path="/" component={Container} />
        </Switch>
      </Router>
    </Suspense>
  );
};

export default App;
