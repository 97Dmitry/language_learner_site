import React, { Component } from "react";
// import style from "./App.module.scss";
import Auth from "./Auth/Auth";
// import MainLayout from "./hoc/MainLayout/MainLayout";
import AuthLayout from "./hoc/AuthLayout/AuthLayout";

class App extends Component {
  render() {
    return (
      <AuthLayout>
        <Auth />
      </AuthLayout>
    );
  }
}

export default App;
