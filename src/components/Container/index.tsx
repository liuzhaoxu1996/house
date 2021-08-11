import { Redirect, Switch } from "react-router-dom";
import PrivateRoute from "../../routes/PrivateRoute";
import Footer from "../Footer";
import Header from "../Header";
import Sidebar from "../Sidebar";

import Home from "../../pages/Home";
import Center from "../../pages/Center";
import layoutStyle from "../index.module.scss";

const Container = (props: any) => {
  console.log("Container", props);
  return (
    <>
      <Header />
      <div className={layoutStyle.content}>
        <Sidebar />
        <div>
          <Switch>
            <PrivateRoute path="/home" exact auth component={Home} />
            <PrivateRoute path="/center" exact auth component={Center} />
            <Redirect exact to="/home" />
          </Switch>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Container;
