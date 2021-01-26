import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./core/Home";
import Form from "./core/Form";
import Login from "./core/Login";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/form" exact component={Form} />
        <Route path="/login" exact component={Login} />
      </Switch>
    </Router>
  );
};

export default Routes;
