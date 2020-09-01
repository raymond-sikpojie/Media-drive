import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Register from "./components/form/Register";
import SignIn from "./components/form/SignIn";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/register" component={Register} />
        <Route path="/login" component={SignIn} />
      </Switch>
    </Router>
  );
}
