import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";

export default () => (
  <Switch>
    <Route path="/home" component={Home} />
  </Switch>
);
