import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { PrivateRoute } from "../components/PrivateRoute";

import Home from "../components/containers/home/Home";
import Login from "../components/containers/Login";
import SignUp from "../components/containers/SignUp";
import NotFound from "../components/containers/NotFound";


import { AuthProvider } from "../context/AuthContext";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Switch>
         
          <Route exact path="/" component={Login}></Route>
          <Route exact path="/SignUp" component={SignUp}></Route>
          <PrivateRoute exact path="/Home" component={Home}></PrivateRoute>
          <Route component={NotFound}></Route>
        </Switch>
      </AuthProvider>
    </Router>
  );
};
export default App;
