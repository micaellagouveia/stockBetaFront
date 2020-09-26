import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";
import Home from "../pages/Home";
import AuthContextProvider from "../store/contexts/authContext";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <AuthContextProvider>
          <Route path="/" exact component={SignIn} />
          <Route path="/signup" exact component={SignUp} />
          <Route path="/home" exact component={Home} />
        </AuthContextProvider>
      </Switch>
    </BrowserRouter>
  );
}
