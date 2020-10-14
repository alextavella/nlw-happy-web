import React from "react";
import { Route, Switch } from "react-router-dom";
import Landing from "../pages/Landing";
import OrphanagesMap from "../pages/OrphanagesMap";

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" component={Landing} exact />
      <Route path="/app" component={OrphanagesMap} />
    </Switch>
  );
};

export default Routes;
